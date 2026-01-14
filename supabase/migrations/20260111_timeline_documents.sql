-- Add document URLs to timeline events for visual proof display
-- Migration: 20260111_timeline_documents.sql

-- Add column for source document thumbnail
ALTER TABLE public.timeline_events
ADD COLUMN IF NOT EXISTS source_document_url TEXT,
ADD COLUMN IF NOT EXISTS source_document_caption TEXT;

-- Update existing timeline events with their source documents
UPDATE public.timeline_events
SET source_document_url = '/images/documents/timeline/1854-deed.jpg',
    source_document_caption = '1854 Deed Abstract'
WHERE year = 1854 AND title LIKE '%Built%';

UPDATE public.timeline_events
SET source_document_url = '/images/documents/timeline/1870-roset-obituary.jpg',
    source_document_caption = 'Evening Telegraph, August 10, 1870'
WHERE year = 1870 AND title LIKE '%Roset Dies%';

UPDATE public.timeline_events
SET source_document_url = '/images/documents/timeline/1893-sale-newspaper.jpg',
    source_document_caption = 'Philadelphia Inquirer, May 11, 1893'
WHERE year = 1893 AND title LIKE '%$14,000%';

UPDATE public.timeline_events
SET source_document_url = '/images/documents/timeline/1899-renovation-deed.jpg',
    source_document_caption = '1899 Deed Abstract'
WHERE year = 1899 AND title LIKE '%Renovation%';

UPDATE public.timeline_events
SET source_document_url = '/images/documents/timeline/1915-suffrage-newspaper.jpg',
    source_document_caption = 'Evening Public Ledger, January 8, 1915'
WHERE year = 1915 AND title LIKE '%Martha Davis%';

UPDATE public.timeline_events
SET source_document_url = '/images/documents/timeline/1922-apartments-deed.jpg',
    source_document_caption = '1922 Deed Abstract'
WHERE year = 1922 AND title LIKE '%Apartments%';
