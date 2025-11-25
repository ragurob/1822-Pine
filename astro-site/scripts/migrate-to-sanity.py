#!/usr/bin/env python3
"""
Complete Content Migration Script
Migrates ALL content from Quarto site to Sanity CMS with image optimization
"""

import os
import re
import json
import yaml
import hashlib
from pathlib import Path
from typing import Dict, List, Any, Optional
from datetime import datetime
import requests
from PIL import Image
import io

# Configuration
SANITY_PROJECT_ID = os.getenv('SANITY_PROJECT_ID', 'YOUR_PROJECT_ID')
SANITY_DATASET = os.getenv('SANITY_DATASET', 'production')
SANITY_TOKEN = os.getenv('SANITY_TOKEN')  # Write token from sanity.io/manage
SANITY_API_VERSION = '2024-01-01'

WEBSITE_DIR = Path('../website')
IMAGES_DIR = Path('../images')
CHAPTERS_DIR = WEBSITE_DIR / 'chapters'

# Sanity API endpoints
SANITY_API_URL = f'https://{SANITY_PROJECT_ID}.api.sanity.io/v{SANITY_API_VERSION}/data'
SANITY_ASSETS_URL = f'https://{SANITY_PROJECT_ID}.api.sanity.io/v{SANITY_API_VERSION}/assets/images/{SANITY_DATASET}'

class SanityClient:
    """Sanity API client for uploading content"""

    def __init__(self):
        if not SANITY_TOKEN:
            raise ValueError("SANITY_TOKEN environment variable must be set")

        self.headers = {
            'Authorization': f'Bearer {SANITY_TOKEN}',
            'Content-Type': 'application/json',
        }

    def create_document(self, doc_type: str, data: Dict[str, Any], doc_id: Optional[str] = None) -> Dict:
        """Create or update a document in Sanity"""
        document = {
            '_type': doc_type,
            **data
        }

        if doc_id:
            document['_id'] = doc_id

        mutations = [{
            'createOrReplace': document
        }]

        response = requests.post(
            f'{SANITY_API_URL}/mutate/{SANITY_DATASET}',
            headers=self.headers,
            json={'mutations': mutations}
        )

        if response.status_code != 200:
            print(f"Error creating document: {response.text}")
            response.raise_for_status()

        result = response.json()
        print(f"✓ Created {doc_type}: {data.get('title', data.get('name', 'Untitled'))}")
        return result['results'][0] ['document']

    def upload_image(self, image_path: Path, optimize: bool = True) -> Dict:
        """Upload and optimize an image to Sanity"""
        print(f"  Uploading image: {image_path.name}...")

        # Read and optionally optimize image
        with Image.open(image_path) as img:
            # Convert to RGB if needed
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')

            if optimize:
                # Resize if too large (max 2400px wide)
                max_width = 2400
                if img.width > max_width:
                    ratio = max_width / img.width
                    new_size = (max_width, int(img.height * ratio))
                    img = img.resize(new_size, Image.Resampling.LANCZOS)

                # Save optimized version
                buffer = io.BytesIO()
                img.save(buffer, format='JPEG', quality=85, optimize=True)
                buffer.seek(0)
                image_data = buffer.read()
            else:
                # Use original
                with open(image_path, 'rb') as f:
                    image_data = f.read()

        # Upload to Sanity
        headers = {
            'Authorization': f'Bearer {SANITY_TOKEN}',
            'Content-Type': 'image/jpeg',
        }

        response = requests.post(
            SANITY_ASSETS_URL,
            headers=headers,
            data=image_data
        )

        if response.status_code != 200:
            print(f"Error uploading image: {response.text}")
            response.raise_for_status()

        asset_doc = response.json()['document']
        print(f"  ✓ Uploaded: {asset_doc['_id']}")

        return {
            '_type': 'image',
            'asset': {
                '_type': 'reference',
                '_ref': asset_doc['_id']
            }
        }

def parse_qmd_file(file_path: Path) -> Dict[str, Any]:
    """Parse a Quarto markdown file into frontmatter and content"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract YAML frontmatter
    frontmatter_match = re.match(r'^---\s*\n(.*?)\n---\s*\n(.*)$', content, re.DOTALL)

    if frontmatter_match:
        frontmatter = yaml.safe_load(frontmatter_match.group(1))
        body = frontmatter_match.group(2)
    else:
        frontmatter = {}
        body = content

    return {
        'frontmatter': frontmatter,
        'content': body,
        'filename': file_path.name
    }

def markdown_to_portable_text(markdown: str) -> List[Dict]:
    """Convert markdown to Sanity's Portable Text format (simplified)"""
    # This is a basic conversion - for production, use a proper markdown parser
    blocks = []

    # Split by paragraphs
    paragraphs = markdown.split('\n\n')

    for para in paragraphs:
        para = para.strip()
        if not para:
            continue

        # Handle headings
        if para.startswith('#'):
            level = len(re.match(r'^#+', para).group(0))
            text = para.lstrip('#').strip()
            blocks.append({
                '_type': 'block',
                'style': f'h{level}',
                'children': [{'_type': 'span', 'text': text}]
            })

        # Regular paragraph
        else:
            # Remove markdown formatting for now (basic)
            text = re.sub(r'\*\*(.*?)\*\*', r'\1', para)  # Bold
            text = re.sub(r'\*(.*?)\*', r'\1', text)  # Italic
            text = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', text)  # Links

            blocks.append({
                '_type': 'block',
                'style': 'normal',
                'children': [{'_type': 'span', 'text': text}]
            })

    return blocks

def migrate_homepage(client: SanityClient):
    """Migrate homepage content"""
    print("\n🏠 Migrating Homepage...")

    homepage_file = WEBSITE_DIR / 'index.qmd'
    data = parse_qmd_file(homepage_file)

    # Upload hero image
    hero_image_path = IMAGES_DIR / 'property' / 'DSC00064.jpg'
    hero_image = None
    if hero_image_path.exists():
        hero_image = client.upload_image(hero_image_path)

    homepage_doc = {
        'title': data['frontmatter'].get('title', 'The Rittenhouse Residence'),
        'hero': {
            '_type': 'heroSection',
            'image': hero_image,
            'heading': "You're Not Just Booking a House",
            'subheading': "You're Stepping Into Philadelphia History",
            'primaryCta': {
                '_type': 'ctaButton',
                'text': 'Check Availability',
                'url': '#availability',
                'style': 'primary'
            },
            'secondaryCta': {
                '_type': 'ctaButton',
                'text': 'Browse Photos',
                'url': '/gallery',
                'style': 'link'
            },
            'overlayOpacity': 25
        },
        'trustBar': {
            'text': '★★★★★ 300+ five-star reviews • Featured in Philadelphia Magazine • Historic District designation since 1995'
        },
        'atAGlance': [
            {
                'icon': '🏠',
                'heading': '16-18 Guests',
                'description': '8 bedrooms • 5 suites • 5.5 baths'
            },
            {
                'icon': '📍',
                'heading': 'Prime Location',
                'description': '2-minute walk to Rittenhouse Square'
            },
            {
                'icon': '⭐',
                'heading': '4.9/5 Rating',
                'description': '300+ verified five-star reviews'
            },
            {
                'icon': '🏛️',
                'heading': 'Built 1854',
                'description': 'Museum-quality historic preservation'
            }
        ],
        'bookingCta': {
            'heading': 'Ready to Make History?',
            'description': 'This isn\'t just a place to stay. It\'s a chance to live inside Philadelphia\'s story.',
            'airbnbUrl': 'https://www.airbnb.com/rooms/6000930',
            'vrboUrl': 'https://www.vrbo.com/757481',
            'startingRate': '$1,600'
        },
        'seo': {
            '_type': 'seoMeta',
            'metaTitle': data['frontmatter'].get('title'),
            'metaDescription': data['frontmatter'].get('description'),
            'keywords': data['frontmatter'].get('keywords', [])
        }
    }

    client.create_document('homepage', homepage_doc, 'homepage')

def migrate_rates_page(client: SanityClient):
    """Migrate rates page"""
    print("\n💰 Migrating Rates Page...")

    rates_file = WEBSITE_DIR / 'rates.qmd'
    data = parse_qmd_file(rates_file)

    rates_doc = {
        'title': 'Rates & Booking',
        'weekdayRate': 1600,
        'weekendRate': 1800,
        'primeWeekendRate': 2500,
        'cleaningFee': 450,
        'weeklyDiscount': 10,
        'biweeklyDiscount': 15,
        'monthlyDiscount': 20,
        'directBookingDiscount': 5,
        'minimumStay': 2,
        'checkInTime': '4:00 PM',
        'checkOutTime': '11:00 AM',
        'airbnbUrl': 'https://www.airbnb.com/rooms/6000930',
        'vrboUrl': 'https://www.vrbo.com/757481',
        'taxRate': 15.5,
        'seo': {
            '_type': 'seoMeta',
            'metaTitle': data['frontmatter'].get('title'),
            'metaDescription': data['frontmatter'].get('description')
        }
    }

    client.create_document('ratesPage', rates_doc, 'rates')

def migrate_gallery_images(client: SanityClient):
    """Migrate all property images"""
    print("\n🖼️  Migrating Gallery Images...")

    # Load image catalog
    catalog_file = WEBSITE_DIR / 'images' / 'property' / 'photo-catalog.json'

    if catalog_file.exists():
        with open(catalog_file, 'r') as f:
            catalog = json.load(f)

        for idx, photo in enumerate(catalog.get('photos', [])):
            image_path = IMAGES_DIR / 'property' / photo['filename']

            if not image_path.exists():
                print(f"  ⚠️  Image not found: {image_path}")
                continue

            # Upload image
            image_ref = client.upload_image(image_path, optimize=True)

            # Create gallery document
            gallery_doc = {
                'title': photo.get('description', image_path.stem),
                'image': {
                    **image_ref,
                    'alt': photo.get('description', ''),
                    'caption': photo.get('description', '')
                },
                'room': photo.get('room', '').lower().replace(' ', '-'),
                'tags': photo.get('features', []),
                'featured': photo.get('priority') == 'high',
                'sortOrder': idx
            }

            client.create_document('galleryImage', gallery_doc)

    else:
        # Fallback: Upload all images in directory
        property_images = sorted((IMAGES_DIR / 'property').glob('DSC*.jpg'))

        for idx, image_path in enumerate(property_images):
            image_ref = client.upload_image(image_path, optimize=True)

            gallery_doc = {
                'title': f'Property Photo {idx + 1}',
                'image': {
                    **image_ref,
                    'alt': f'1822 Pine Street interior photo {idx + 1}'
                },
                'sortOrder': idx,
                'featured': idx < 6  # First 6 are featured
            }

            client.create_document('galleryImage', gallery_doc)

def migrate_history_chapters(client: SanityClient):
    """Migrate all historical chapters"""
    print("\n📚 Migrating History Chapters...")

    chapter_files = sorted(CHAPTERS_DIR.glob('*.qmd'))

    for chapter_file in chapter_files:
        # Skip special files
        if chapter_file.name.startswith('99-'):
            continue

        data = parse_qmd_file(chapter_file)

        # Extract chapter number from filename
        chapter_match = re.match(r'(\d+)-', chapter_file.stem)
        chapter_number = int(chapter_match.group(1)) if chapter_match else 0

        # Convert markdown content to portable text
        portable_text = markdown_to_portable_text(data['content'])

        chapter_doc = {
            'title': data['frontmatter'].get('title', chapter_file.stem.replace('-', ' ').title()),
            'slug': {'_type': 'slug', 'current': chapter_file.stem},
            'chapterNumber': chapter_number,
            'timeperiod': data['frontmatter'].get('subtitle', ''),
            'excerpt': data['frontmatter'].get('description', '')[:200],
            'content': portable_text,
            'published': True
        }

        client.create_document('historyChapter', chapter_doc)

def migrate_faqs(client: SanityClient):
    """Create FAQ items from FAQ page"""
    print("\n❓ Migrating FAQs...")

    faq_file = WEBSITE_DIR / 'faq.qmd'

    if not faq_file.exists():
        print("  No FAQ file found, skipping...")
        return

    data = parse_qmd_file(faq_file)
    content = data['content']

    # Parse Q&A pairs (simple regex)
    qa_pattern = r'###?\s+(.+?)\n\n(.+?)(?=\n###?|\Z)'
    matches = re.findall(qa_pattern, content, re.DOTALL)

    for idx, (question, answer) in enumerate(matches):
        question = question.strip()
        answer_blocks = markdown_to_portable_text(answer)

        # Determine category from question keywords
        category = 'booking'
        if any(word in question.lower() for word in ['parking', 'location', 'walk', 'transit']):
            category = 'location'
        elif any(word in question.lower() for word in ['amenity', 'wifi', 'kitchen', 'bathroom']):
            category = 'amenities'
        elif any(word in question.lower() for word in ['rule', 'smoking', 'pet', 'noise']):
            category = 'rules'

        faq_doc = {
            'question': question,
            'answer': answer_blocks,
            'category': category,
            'sortOrder': idx
        }

        client.create_document('faqItem', faq_doc)

def migrate_site_settings(client: SanityClient):
    """Create site settings"""
    print("\n⚙️  Migrating Site Settings...")

    settings_doc = {
        'siteName': 'The Rittenhouse Residence',
        'tagline': 'Historic Luxury Lodging at 1822 Pine Street, Philadelphia',
        'contactEmail': 'info@therittenhouseresidence.com',
        'address': {
            'street': '1822 Pine Street',
            'city': 'Philadelphia',
            'state': 'PA',
            'zip': '19103'
        },
        'coordinates': {
            '_type': 'geopoint',
            'lat': 39.9477,
            'lng': -75.1732
        },
        'socialLinks': {
            'instagram': 'https://instagram.com/therittenhouseresidence',
            'facebook': 'https://facebook.com/therittenhouseresidence'
        },
        'airbnbUrl': 'https://www.airbnb.com/rooms/6000930',
        'vrboUrl': 'https://www.vrbo.com/757481',
        'copyrightText': '© 2024 The Rittenhouse Residence',
        'footerText': 'Meticulously preserved since 1854'
    }

    client.create_document('siteSettings', settings_doc, 'siteSettings')

def migrate_seo_settings(client: SanityClient):
    """Create SEO settings"""
    print("\n🔍 Migrating SEO Settings...")

    seo_doc = {
        'defaultMetaTitle': 'The Rittenhouse Residence | Historic Luxury Rental in Philadelphia',
        'defaultMetaDescription': 'Book 1822 Pine Street - a meticulously preserved 1854 mansion near Rittenhouse Square. Perfect for family reunions, corporate retreats & weddings. Sleeps 16-18 guests. 300+ 5-star reviews.',
        'globalKeywords': [
            'Philadelphia luxury lodging',
            'Rittenhouse Square hotel',
            'historic townhouse rental',
            '1822 Pine Street',
            'corporate retreats',
            'family reunions',
            'vacation rental Philadelphia'
        ],
        'structuredData': {
            'organizationName': 'The Rittenhouse Residence',
            'type': 'LodgingBusiness',
            'priceRange': '$1600-$2500',
            'telephone': '+1-215-XXX-XXXX'
        }
    }

    client.create_document('seoSettings', seo_doc, 'seoSettings')

def main():
    """Run complete migration"""
    print("="*60)
    print("  1822 PINE STREET - COMPLETE CONTENT MIGRATION")
    print("  Quarto → Sanity.io CMS")
    print("="*60)

    if not SANITY_TOKEN:
        print("\n❌ ERROR: SANITY_TOKEN environment variable not set!")
        print("\nTo get your token:")
        print("1. Go to https://sanity.io/manage")
        print("2. Select your project")
        print("3. Go to API > Tokens")
        print("4. Create a token with 'Editor' permissions")
        print("5. Run: export SANITY_TOKEN='your_token_here'")
        return

    try:
        client = SanityClient()

        # Run migrations
        migrate_homepage(client)
        migrate_rates_page(client)
        migrate_gallery_images(client)
        migrate_history_chapters(client)
        migrate_faqs(client)
        migrate_site_settings(client)
        migrate_seo_settings(client)

        print("\n" + "="*60)
        print("  ✅ MIGRATION COMPLETE!")
        print("="*60)
        print("\nNext steps:")
        print("1. Visit your Sanity Studio to review content")
        print("2. Add any missing testimonials manually")
        print("3. Upload remaining images if needed")
        print("4. Configure navigation and menus")
        print("5. Build Astro pages to display this content")

    except Exception as e:
        print(f"\n❌ Migration failed: {e}")
        raise

if __name__ == '__main__':
    main()
