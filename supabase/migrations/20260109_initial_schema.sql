-- Rittenhouse Residence Database Schema
-- Initial migration for core functionality

-- Enable UUID extension in extensions schema (Supabase way)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;

-- ============================================
-- USERS & AUTHENTICATION
-- ============================================

-- User profiles (extends Supabase auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'guest' CHECK (role IN ('guest', 'host', 'cleaner', 'maintenance', 'admin')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- ============================================
-- BOOKINGS
-- ============================================

-- Reservations synced from Guesty
CREATE TABLE public.reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guesty_id TEXT UNIQUE,
    guest_id UUID REFERENCES public.profiles(id),
    guest_name TEXT NOT NULL,
    guest_email TEXT,
    guest_phone TEXT,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    num_guests INTEGER NOT NULL DEFAULT 1,
    total_amount DECIMAL(10,2),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled')),
    source TEXT, -- 'direct', 'airbnb', 'vrbo', etc.
    special_requests TEXT,
    internal_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Guests can view their own reservations
CREATE POLICY "Guests can view own reservations" ON public.reservations
    FOR SELECT USING (
        auth.uid() = guest_id OR
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('host', 'admin'))
    );

-- ============================================
-- GUEST PORTAL
-- ============================================

-- Guest access codes for portal
CREATE TABLE public.guest_access (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reservation_id UUID REFERENCES public.reservations(id) ON DELETE CASCADE,
    access_code TEXT UNIQUE NOT NULL,
    door_code TEXT,
    wifi_password TEXT,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.guest_access ENABLE ROW LEVEL SECURITY;

-- Guest messages/requests
CREATE TABLE public.guest_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reservation_id UUID REFERENCES public.reservations(id) ON DELETE CASCADE,
    sender_type TEXT NOT NULL CHECK (sender_type IN ('guest', 'host', 'system')),
    message TEXT NOT NULL,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.guest_messages ENABLE ROW LEVEL SECURITY;

-- ============================================
-- HISTORICAL DOCUMENTS
-- ============================================

-- Historical document archive
CREATE TABLE public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    document_type TEXT NOT NULL CHECK (document_type IN ('deed', 'newspaper', 'census', 'city_directory', 'floor_plan', 'photograph', 'letter', 'other')),
    date_circa TEXT, -- e.g., "1854", "c. 1890", "1915-03-22"
    source TEXT, -- Where the document came from
    citation TEXT, -- Full academic citation
    file_url TEXT,
    thumbnail_url TEXT,
    ocr_text TEXT, -- Searchable text from OCR
    metadata JSONB DEFAULT '{}',
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Public can view published documents
CREATE POLICY "Published documents are viewable by everyone" ON public.documents
    FOR SELECT USING (is_published = true);

-- Historical figures mentioned in documents
CREATE TABLE public.historical_figures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    birth_year INTEGER,
    death_year INTEGER,
    biography TEXT,
    relationship TEXT, -- Relationship to the house
    portrait_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.historical_figures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Historical figures are viewable by everyone" ON public.historical_figures
    FOR SELECT USING (true);

-- Link documents to figures
CREATE TABLE public.document_figures (
    document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE,
    figure_id UUID REFERENCES public.historical_figures(id) ON DELETE CASCADE,
    PRIMARY KEY (document_id, figure_id)
);

-- ============================================
-- TIMELINE EVENTS
-- ============================================

CREATE TABLE public.timeline_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    year INTEGER NOT NULL,
    month INTEGER,
    day INTEGER,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT CHECK (category IN ('construction', 'ownership', 'family', 'community', 'renovation', 'cultural')),
    image_url TEXT,
    document_id UUID REFERENCES public.documents(id),
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.timeline_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Timeline events are viewable by everyone" ON public.timeline_events
    FOR SELECT USING (true);

-- ============================================
-- OPERATIONS (Staff Hub)
-- ============================================

-- Cleaning tasks
CREATE TABLE public.cleaning_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reservation_id UUID REFERENCES public.reservations(id),
    assigned_to UUID REFERENCES public.profiles(id),
    scheduled_date DATE NOT NULL,
    task_type TEXT NOT NULL CHECK (task_type IN ('turnover', 'deep_clean', 'mid_stay', 'inspection')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'verified')),
    checklist JSONB DEFAULT '[]',
    notes TEXT,
    photos JSONB DEFAULT '[]', -- Array of photo URLs
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.cleaning_tasks ENABLE ROW LEVEL SECURITY;

-- Staff can view assigned tasks
CREATE POLICY "Staff can view cleaning tasks" ON public.cleaning_tasks
    FOR SELECT USING (
        auth.uid() = assigned_to OR
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('host', 'admin', 'cleaner'))
    );

-- Maintenance issues
CREATE TABLE public.maintenance_issues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reported_by UUID REFERENCES public.profiles(id),
    assigned_to UUID REFERENCES public.profiles(id),
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    photos JSONB DEFAULT '[]',
    resolution_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

ALTER TABLE public.maintenance_issues ENABLE ROW LEVEL SECURITY;

-- Inventory tracking
CREATE TABLE public.inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_name TEXT NOT NULL,
    category TEXT NOT NULL,
    current_quantity INTEGER NOT NULL DEFAULT 0,
    minimum_quantity INTEGER NOT NULL DEFAULT 0,
    unit TEXT,
    location TEXT,
    last_restocked TIMESTAMPTZ,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

-- ============================================
-- REVIEWS & FEEDBACK
-- ============================================

CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reservation_id UUID REFERENCES public.reservations(id),
    guest_name TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    source TEXT, -- 'direct', 'airbnb', 'google', etc.
    is_published BOOLEAN DEFAULT false,
    response TEXT,
    responded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published reviews are viewable" ON public.reviews
    FOR SELECT USING (is_published = true);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to relevant tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at BEFORE UPDATE ON public.reservations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON public.documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_historical_figures_updated_at BEFORE UPDATE ON public.historical_figures
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_reservations_dates ON public.reservations(check_in, check_out);
CREATE INDEX idx_reservations_status ON public.reservations(status);
CREATE INDEX idx_reservations_guesty ON public.reservations(guesty_id);
CREATE INDEX idx_documents_type ON public.documents(document_type);
CREATE INDEX idx_documents_date ON public.documents(date_circa);
CREATE INDEX idx_timeline_year ON public.timeline_events(year);
CREATE INDEX idx_cleaning_date ON public.cleaning_tasks(scheduled_date);
CREATE INDEX idx_maintenance_status ON public.maintenance_issues(status, priority);
