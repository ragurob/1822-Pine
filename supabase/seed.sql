-- Rittenhouse Residence - Historical Data Seed
-- Source: Deep Research Report verified January 2026

-- ============================================
-- HISTORICAL FIGURES
-- ============================================

INSERT INTO public.historical_figures (id, name, birth_year, death_year, biography, relationship, portrait_url) VALUES
-- Builders & First Owners
('f1a00001-0000-0000-0000-000000000001', 'John McCrea', NULL, NULL,
 'Former shipping magnate with one of Philadelphia''s largest fleets in the 1820s-1830s. Became one of the most prolific Rittenhouse real estate developers, owning property on nearly every block of Spruce, Delancey, and Pine Streets west of 17th Street. Built houses "to suit the conservative tastes of Proper Philadelphians."',
 'Builder (1854)', NULL),

('f1a00001-0000-0000-0000-000000000002', 'John Roset', 1794, 1870,
 'Philadelphia merchant born September 3, 1794. Son/grandson of Jean Jacques Rozet (1764/65-1850), a French-Hungarian immigrant and successful dry goods merchant. Died August 8, 1870.',
 'First Owner (1854-1870)', NULL),

('f1a00001-0000-0000-0000-000000000003', 'Mary Ann Laning Roset', 1807, 1880,
 'Wife of John Roset. Mother of five children including Ellen Roset who married Anthony J. Drexel. Lived at 1822 Pine Street until her death in 1880.',
 'First Owner''s Wife', NULL),

-- The Drexel Connection
('f1a00001-0000-0000-0000-000000000004', 'Ellen Bicking Rozet Drexel', 1829, 1891,
 'Born February 21, 1829. Daughter of John and Mary Ann Roset, raised at 1822 Pine Street. Married Anthony Joseph Drexel on August 13, 1850 at the First Presbyterian Church, Philadelphia. Mother of nine children. The founding of Drexel Institute was described as "as much Ellen''s idea as it was her husband''s." Died November 27, 1891, just three weeks before the opening of Drexel Institute.',
 'Raised at 1822 Pine, Connected to Drexel Dynasty', NULL),

('f1a00001-0000-0000-0000-000000000005', 'Anthony Joseph Drexel', 1826, 1893,
 'Son-in-law of John Roset through marriage to Ellen. Dominant partner of Drexel & Co. of Philadelphia. Founder of Drexel, Morgan & Co. (1871) with J.P. Morgan—predecessor to JPMorgan Chase. Founder of Drexel University (1891). One of the most influential American bankers of the 19th century.',
 'Son-in-Law, Banking Dynasty Founder', NULL),

-- The Spencer Tragedy
('f1a00001-0000-0000-0000-000000000006', 'Graham Spencer', 1852, 1896,
 'Resided at 1822 Pine Street in the early 1890s. Husband of Agnes Mary Smith Spencer. Father of Howard Spencer who died of scarlet fever in 1891.',
 'Owner (1890s)', NULL),

('f1a00001-0000-0000-0000-000000000007', 'Agnes Mary Smith Spencer', 1862, 1921,
 'Wife of Graham Spencer. Commissioned the 1899 renovation of 1822 Pine Street after her husband''s death. Documented as a client for residential work on the 1800 block of Pine Street in the Philadelphia Architects and Buildings database.',
 'Owner, Commissioned 1899 Renovation', NULL),

('f1a00001-0000-0000-0000-000000000008', 'Howard Spencer', 1884, 1891,
 'Son of Graham and Agnes Spencer. Born February 26, 1884. Died April 20, 1891, at age 7, from scarlet fever at 1822 Pine Street. Buried at Laurel Hill Cemetery, Section E, Plot 37-48. His death represents the tragedy faced by many Philadelphia families during the scarlet fever epidemics of the 1890s.',
 'Child, Died at the House', NULL),

-- The Suffrage Connection
('f1a00001-0000-0000-0000-000000000009', 'Henry C. Davis', NULL, NULL,
 'Husband of Naomi Lawton Davis. Resided at 1822 Pine Street from approximately 1904-1918. The family hosted "At Home" receptions documented in the Philadelphia Inquirer.',
 'Owner (1904-1918)', NULL),

('f1a00001-0000-0000-0000-000000000010', 'Naomi Lawton Davis', NULL, 1918,
 'Wife of Henry C. Davis. Responded to Dr. Anna Howard Shaw''s December 1913 call for women to refuse income taxes, stating from 1822 Pine Street: "It''s the same principle against which my forbears protested. They didn''t have to levy a war tax, because the Quakers didn''t believe in war. Resistance to taxation without representation has my entire sympathy." Died May 21, 1918.',
 'Owner''s Wife, Suffragist', NULL),

('f1a00001-0000-0000-0000-000000000011', 'Martha Davis', NULL, NULL,
 'Daughter of Henry C. and Naomi Lawton Davis. On January 8, 1915, sold Equal Franchise Society tickets from 1822 Pine Street, as documented in the Evening Public Ledger. Active in the Philadelphia suffrage movement.',
 'Daughter, Suffragist', NULL),

-- Architectural Connection
('f1a00001-0000-0000-0000-000000000012', 'H. Louis Duhring Jr.', 1874, 1953,
 'Partner at Duhring, Okie & Ziegler. B.S. Architecture, University of Pennsylvania (1895). Won first Stewardson Traveling Scholarship in 1897 and studied in Venice. Later notable for Powel House restoration (1931-1932). Believed to have worked on the 1899 renovation of 1822 Pine Street.',
 'Architect (attributed 1899 renovation)', NULL),

('f1a00001-0000-0000-0000-000000000013', 'R. Brognard Okie', 1875, 1945,
 'Partner at Duhring, Okie & Ziegler. Acknowledged master of Pennsylvania Colonial style. Notable later restorations include Betsy Ross House (1936-1937) and Pennsbury Manor (1936-1940).',
 'Architect (attributed 1899 renovation)', NULL);

-- ============================================
-- TIMELINE EVENTS
-- ============================================

INSERT INTO public.timeline_events (year, month, day, title, description, category, is_featured) VALUES
-- Pre-Construction
(1682, NULL, NULL, 'William Penn''s Original Plan',
 'William Penn''s original city plan included five square parks, with "Southwest Square" (later Rittenhouse Square) designated for public use.',
 'community', false),

(1825, NULL, NULL, 'Square Renamed for David Rittenhouse',
 'Southwest Square renamed Rittenhouse Square after David Rittenhouse (1732-1796), scientist and first U.S. Mint director.',
 'community', false),

(1850, 8, 13, 'Ellen Roset Marries Anthony J. Drexel',
 'Ellen Bicking Rozet, daughter of 1822 Pine Street''s future first owners, married Anthony Joseph Drexel at the First Presbyterian Church, Philadelphia. Rev. John D. Ludlow, Provost of the University of Pennsylvania, officiated. This union would connect 1822 Pine Street to one of America''s most influential banking dynasties.',
 'family', true),

(1853, NULL, NULL, 'Rittenhouse Square Transformed',
 'Iron fence and fountains installed around Rittenhouse Square, marking its transformation from "Goosetown" working-class area to fashionable residential district.',
 'community', false),

-- Construction
(1854, NULL, NULL, 'House Built by John McCrea',
 'John McCrea, former shipping magnate turned real estate developer, constructs 1822 Pine Street and sells it to John Roset, a Philadelphia merchant. The house reflects the transition between Greek Revival and Italianate styles.',
 'construction', true),

(1854, 2, 2, 'Philadelphia Consolidation Act',
 'The Consolidation Act expanded Philadelphia to 130 square miles. 1822 Pine Street was built during this transformative year for the city.',
 'community', false),

-- Roset Era
(1870, 8, 8, 'John Roset Dies',
 'John Roset, first owner of 1822 Pine Street, dies at age 76. The house remains with his widow Mary Ann Laning Roset.',
 'ownership', false),

(1880, NULL, NULL, 'Mary Ann Roset Dies',
 'Mary Ann Laning Roset, wife of the first owner, dies. The Roset family''s ownership of 1822 Pine Street ends after 26 years.',
 'ownership', false),

-- Spencer Era
(1891, 4, 20, 'Howard Spencer Dies of Scarlet Fever',
 'Seven-year-old Howard Spencer dies of scarlet fever at 1822 Pine Street. He is buried at Laurel Hill Cemetery, Section E, Plot 37-48. Scarlet fever case-fatality rates in 1890s Philadelphia reached 21.8% for young children.',
 'family', true),

(1891, 11, 27, 'Ellen Roset Drexel Dies',
 'Ellen Bicking Rozet Drexel, raised at 1822 Pine Street, dies at age 62—just three weeks before the opening of Drexel Institute, which was described as "as much Ellen''s idea as her husband''s."',
 'family', false),

(1893, 5, 11, 'Property Sold for $14,000',
 'Property sold for $14,000 as documented in the Philadelphia Inquirer. This represents approximately $480,000 in 2024 dollars.',
 'ownership', false),

(1896, NULL, NULL, 'Graham Spencer Dies',
 'Graham Spencer, father of Howard, dies. His widow Agnes Spencer would commission a major renovation of the property.',
 'ownership', false),

(1899, NULL, NULL, 'Major Renovation by Duhring, Okie & Ziegler',
 'Agnes Spencer commissions a $25,000 renovation (approximately $900,000 today) from the prestigious firm Duhring, Okie & Ziegler, known for their Colonial Revival and Pennsylvania farmhouse style.',
 'renovation', true),

-- Davis Era & Suffrage
(1904, 12, 11, 'Davis Family "At Home" Announced',
 'The Philadelphia Inquirer announces the Davis family''s "At Home" reception schedule at 1822 Pine Street, marking their establishment in Philadelphia society.',
 'family', false),

(1913, 12, NULL, 'Tax Resistance Statement',
 'Mrs. Henry C. Davis (Naomi Lawton Davis) responds to Dr. Anna Howard Shaw''s call for women to refuse income taxes: "It''s the same principle against which my forbears protested. Resistance to taxation without representation has my entire sympathy."',
 'cultural', true),

(1915, 1, 8, 'Martha Davis Sells Suffrage Tickets',
 'The Evening Public Ledger documents Martha Davis selling Equal Franchise Society tickets from 1822 Pine Street, linking the house directly to Philadelphia''s suffrage movement.',
 'cultural', true),

(1918, 5, 21, 'Naomi Lawton Davis Dies',
 'Naomi Lawton Davis, suffrage activist and resident of 1822 Pine Street, dies. The 19th Amendment granting women''s suffrage would pass two years later in 1920.',
 'family', false),

-- Modern Era
(1922, NULL, NULL, 'Converted to Apartments',
 'House converted to multiple apartments, reflecting changing patterns of urban living in the 1920s.',
 'renovation', false),

(1952, NULL, NULL, 'Restored to Single-Family Home',
 'Property restored to single-family residence after 30 years as apartments.',
 'renovation', false),

(1992, 4, 27, 'National Register Listing',
 'Rittenhouse-Fitler Residential Historic District added to National Register of Historic Places (#92001878), encompassing over 2,000 properties including 1822 Pine Street.',
 'cultural', false),

(1995, 2, 8, 'Philadelphia Historic Register',
 '1822 Pine Street and surrounding area added to the Philadelphia Register of Historic Places.',
 'cultural', true);


-- ============================================
-- HISTORICAL DOCUMENTS (References)
-- ============================================

INSERT INTO public.documents (title, description, document_type, date_circa, source, citation, is_published) VALUES
('1854 Deed Abstract', 'Original deed documenting the sale of 1822 Pine Street from John McCrea to John Roset.', 'deed', '1854', 'Philadelphia City Archives', 'Philadelphia Deed Records, 1854', true),

('Ellen Roset-Anthony Drexel Marriage Record', 'Documentation of the August 13, 1850 wedding connecting 1822 Pine Street to the Drexel banking dynasty.', 'other', '1850-08-13', 'First Presbyterian Church, Philadelphia', 'Marriage Register, First Presbyterian Church', true),

('Howard Spencer Death Record', 'Find a Grave Memorial #74603329 documenting the death of 7-year-old Howard Spencer from scarlet fever.', 'other', '1891-04-20', 'Laurel Hill Cemetery', 'Find a Grave Memorial #74603329', true),

('Property Sale - Philadelphia Inquirer', 'Newspaper documentation of the $14,000 sale of 1822 Pine Street.', 'newspaper', '1893-05-11', 'Philadelphia Inquirer', 'Philadelphia Inquirer, May 11, 1893', true),

('Davis Family At Home Announcement', 'Social announcement of Davis family reception schedule at 1822 Pine Street.', 'newspaper', '1904-12-11', 'Philadelphia Inquirer', 'Philadelphia Inquirer, December 11, 1904, p. 36', true),

('Mrs. Davis Tax Resistance Statement', 'Documentation of Naomi Lawton Davis''s response to Dr. Anna Howard Shaw''s call for tax resistance.', 'newspaper', '1913-12', 'Tax Resistance in U.S. Women''s Suffrage Movement', 'suffrage archives, sniggle.net', true),

('Martha Davis Suffrage Ticket Sale', 'Evening Public Ledger article documenting Martha Davis selling Equal Franchise Society tickets from 1822 Pine Street.', 'newspaper', '1915-01-08', 'Evening Public Ledger', 'Evening Public Ledger, January 8, 1915, p. 10', true),

('National Register Nomination', 'National Register of Historic Places nomination for Rittenhouse-Fitler Residential Historic District.', 'other', '1992-04-27', 'National Park Service', 'National Register #92001878', true),

('Philadelphia Historic Commission Listing', 'Philadelphia Register of Historic Places designation for 1822 Pine Street.', 'other', '1995-02-08', 'Philadelphia Historical Commission', 'Philadelphia Register of Historic Places', true);
