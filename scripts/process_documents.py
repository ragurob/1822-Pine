#!/usr/bin/env python3
"""
Document Processing Pipeline for 1822 Pine Street
Handles PDFs, images, and extracts metadata for historical documents
"""

import os
import sys
import json
import re
from datetime import datetime
from pathlib import Path
import hashlib
from typing import Dict, List, Optional, Tuple

# Image processing
from PIL import Image

# PDF processing
import PyPDF2

# OCR
import pytesseract

# Data handling
import yaml

class DocumentProcessor:
    def __init__(self, base_path: str = "."):
        self.base_path = Path(base_path)
        self.raw_dir = self.base_path / "raw_documents"
        self.images_dir = self.base_path / "images"
        self.metadata_dir = self.base_path / "metadata"
        self.data_dir = self.base_path / "data"
        
        # Ensure directories exist
        for dir in [self.raw_dir, self.metadata_dir, 
                   self.images_dir / "clippings", 
                   self.images_dir / "deeds",
                   self.images_dir / "web",
                   self.images_dir / "print"]:
            dir.mkdir(parents=True, exist_ok=True)
    
    def extract_date_from_text(self, text: str) -> Optional[str]:
        """Extract dates from OCR text"""
        # Multiple date patterns for historical documents
        patterns = [
            r'\b(\d{1,2})[/-](\d{1,2})[/-](\d{4})\b',  # MM/DD/YYYY or MM-DD-YYYY
            r'\b(\d{4})[/-](\d{1,2})[/-](\d{1,2})\b',  # YYYY-MM-DD
            r'\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),?\s+(\d{4})\b',
            r'\b(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December),?\s+(\d{4})\b',
            r'\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s+(\d{1,2}),?\s+(\d{4})\b',
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                try:
                    # Convert to standardized format
                    groups = match.groups()
                    if len(groups) == 3:
                        if groups[0].isalpha():  # Month name first
                            month_name = groups[0]
                            day = groups[1]
                            year = groups[2]
                        elif groups[1].isalpha():  # Month name second
                            day = groups[0]
                            month_name = groups[1]
                            year = groups[2]
                        else:  # Numeric date
                            if int(groups[0]) > 31:  # Likely YYYY-MM-DD
                                return f"{groups[0]}-{groups[1]:0>2}-{groups[2]:0>2}"
                            else:  # Likely MM-DD-YYYY
                                return f"{groups[2]}-{groups[0]:0>2}-{groups[1]:0>2}"
                        
                        # Convert month name to number if needed
                        if 'month_name' in locals():
                            months = {
                                'january': '01', 'jan': '01',
                                'february': '02', 'feb': '02',
                                'march': '03', 'mar': '03',
                                'april': '04', 'apr': '04',
                                'may': '05',
                                'june': '06', 'jun': '06',
                                'july': '07', 'jul': '07',
                                'august': '08', 'aug': '08',
                                'september': '09', 'sep': '09',
                                'october': '10', 'oct': '10',
                                'november': '11', 'nov': '11',
                                'december': '12', 'dec': '12'
                            }
                            month_num = months.get(month_name.lower(), '00')
                            return f"{year}-{month_num:0>2}-{int(day):0>2}"
                except:
                    continue
        return None
    
    def extract_entities(self, text: str) -> Dict[str, List[str]]:
        """Extract people, organizations, and addresses from text"""
        entities = {
            'people': [],
            'organizations': [],
            'addresses': [],
            'monetary_amounts': []
        }
        
        # Extract people (simple pattern for historical names)
        name_pattern = r'\b([A-Z][a-z]+(?:\s+[A-Z]\.)?(?:\s+[A-Z][a-z]+)+)\b'
        potential_names = re.findall(name_pattern, text)
        
        # Filter common false positives
        skip_words = {'The', 'Pine Street', 'Philadelphia', 'Company', 'Corporation', 'Building'}
        entities['people'] = [name for name in potential_names 
                             if name not in skip_words and len(name.split()) >= 2]
        
        # Extract addresses
        address_pattern = r'\b(\d+)\s+([\w\s]+(?:Street|St|Avenue|Ave|Road|Rd|Place|Pl|Court|Ct))\b'
        entities['addresses'] = re.findall(address_pattern, text, re.IGNORECASE)
        
        # Extract monetary amounts
        money_pattern = r'\$\s*(\d+(?:,\d{3})*(?:\.\d{2})?)'
        entities['monetary_amounts'] = re.findall(money_pattern, text)
        
        # Extract organizations (simple heuristics)
        org_keywords = ['Company', 'Corporation', 'Society', 'Association', 'Bank', 'Trust']
        org_pattern = r'\b([\w\s]+(?:' + '|'.join(org_keywords) + '))\b'
        entities['organizations'] = re.findall(org_pattern, text, re.IGNORECASE)
        
        return entities
    
    def process_pdf(self, pdf_path: Path) -> Dict:
        """Process a PDF file and extract metadata"""
        metadata = {
            'filename': pdf_path.name,
            'type': 'deed' if 'deed' in pdf_path.name.lower() else 'clipping',
            'file_hash': hashlib.md5(pdf_path.read_bytes()).hexdigest(),
            'processed_date': datetime.now().isoformat(),
            'pages': 0,
            'text': '',
            'extracted_date': None,
            'entities': {},
            'images': []
        }
        
        try:
            # Extract text from PDF
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                metadata['pages'] = len(pdf_reader.pages)
                
                text_content = []
                for page_num, page in enumerate(pdf_reader.pages):
                    page_text = page.extract_text()
                    text_content.append(page_text)
                
                metadata['text'] = '\n'.join(text_content)
            
            # Convert PDF pages to images
            from pdf2image import convert_from_path
            images = convert_from_path(str(pdf_path), dpi=300)
            
            for i, image in enumerate(images):
                # Save high-res version for print
                print_filename = f"{pdf_path.stem}_page_{i+1}_print.png"
                print_path = self.images_dir / "print" / print_filename
                image.save(print_path, 'PNG', dpi=(300, 300))
                
                # Create web-optimized version
                web_image = image.copy()
                web_image.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
                web_filename = f"{pdf_path.stem}_page_{i+1}_web.jpg"
                web_path = self.images_dir / "web" / web_filename
                web_image.save(web_path, 'JPEG', quality=85, optimize=True)
                
                # OCR if text extraction was poor
                if len(metadata['text'].strip()) < 100:
                    ocr_text = pytesseract.image_to_string(image)
                    metadata['text'] += f"\n\n[OCR Page {i+1}]:\n{ocr_text}"
                
                metadata['images'].append({
                    'page': i + 1,
                    'print': str(print_path.relative_to(self.base_path)),
                    'web': str(web_path.relative_to(self.base_path))
                })
        
        except ImportError:
            print("pdf2image not installed. Installing...")
            os.system("pip3 install --user pdf2image")
            return self.process_pdf(pdf_path)  # Retry after install
        
        except Exception as e:
            metadata['error'] = str(e)
        
        # Extract structured data
        if metadata['text']:
            metadata['extracted_date'] = self.extract_date_from_text(metadata['text'])
            metadata['entities'] = self.extract_entities(metadata['text'])
        
        return metadata
    
    def process_image(self, image_path: Path) -> Dict:
        """Process an image file and extract metadata"""
        metadata = {
            'filename': image_path.name,
            'type': 'deed' if 'deed' in image_path.name.lower() else 'clipping',
            'file_hash': hashlib.md5(image_path.read_bytes()).hexdigest(),
            'processed_date': datetime.now().isoformat(),
            'dimensions': None,
            'text': '',
            'extracted_date': None,
            'entities': {},
            'images': []
        }
        
        try:
            # Open and analyze image
            with Image.open(image_path) as img:
                metadata['dimensions'] = f"{img.width}x{img.height}"
                
                # Save print version (high quality)
                print_filename = f"{image_path.stem}_print.png"
                print_path = self.images_dir / "print" / print_filename
                
                # Convert to RGB if necessary
                if img.mode in ('RGBA', 'LA', 'P'):
                    rgb_img = Image.new('RGB', img.size, (255, 255, 255))
                    rgb_img.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                    img = rgb_img
                
                # Save high-res for print
                img.save(print_path, 'PNG', dpi=(300, 300))
                
                # Create web version
                web_img = img.copy()
                web_img.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
                web_filename = f"{image_path.stem}_web.jpg"
                web_path = self.images_dir / "web" / web_filename
                web_img.save(web_path, 'JPEG', quality=85, optimize=True)
                
                # Perform OCR
                metadata['text'] = pytesseract.image_to_string(img)
                
                metadata['images'].append({
                    'print': str(print_path.relative_to(self.base_path)),
                    'web': str(web_path.relative_to(self.base_path))
                })
        
        except Exception as e:
            metadata['error'] = str(e)
        
        # Extract structured data
        if metadata['text']:
            metadata['extracted_date'] = self.extract_date_from_text(metadata['text'])
            metadata['entities'] = self.extract_entities(metadata['text'])
        
        # Try to extract date from filename if not found in text
        if not metadata['extracted_date']:
            date_match = re.search(r'(\d{4})[-_](\d{2})[-_](\d{2})', image_path.name)
            if date_match:
                metadata['extracted_date'] = f"{date_match.group(1)}-{date_match.group(2)}-{date_match.group(3)}"
        
        return metadata
    
    def process_all_documents(self) -> Dict[str, List[Dict]]:
        """Process all documents in raw_documents folder"""
        results = {
            'processed': [],
            'errors': [],
            'summary': {
                'total_documents': 0,
                'pdfs': 0,
                'images': 0,
                'deeds': 0,
                'clippings': 0,
                'dates_extracted': 0,
                'people_found': set(),
                'addresses_found': set()
            }
        }
        
        # Process all files in raw_documents
        for file_path in self.raw_dir.iterdir():
            if file_path.is_file():
                print(f"Processing: {file_path.name}")
                results['summary']['total_documents'] += 1
                
                try:
                    if file_path.suffix.lower() == '.pdf':
                        metadata = self.process_pdf(file_path)
                        results['summary']['pdfs'] += 1
                    elif file_path.suffix.lower() in ['.jpg', '.jpeg', '.png', '.tiff', '.tif']:
                        metadata = self.process_image(file_path)
                        results['summary']['images'] += 1
                    else:
                        print(f"Skipping unsupported file: {file_path.name}")
                        continue
                    
                    # Update summary
                    if metadata['type'] == 'deed':
                        results['summary']['deeds'] += 1
                    else:
                        results['summary']['clippings'] += 1
                    
                    if metadata.get('extracted_date'):
                        results['summary']['dates_extracted'] += 1
                    
                    if metadata.get('entities'):
                        results['summary']['people_found'].update(metadata['entities'].get('people', []))
                        results['summary']['addresses_found'].update(
                            [f"{num} {street}" for num, street in metadata['entities'].get('addresses', [])]
                        )
                    
                    # Save metadata
                    metadata_file = self.metadata_dir / f"{file_path.stem}_metadata.json"
                    with open(metadata_file, 'w') as f:
                        json.dump(metadata, f, indent=2)
                    
                    results['processed'].append(metadata)
                    
                except Exception as e:
                    error_info = {
                        'filename': file_path.name,
                        'error': str(e)
                    }
                    results['errors'].append(error_info)
                    print(f"Error processing {file_path.name}: {e}")
        
        # Convert sets to lists for JSON serialization
        results['summary']['people_found'] = list(results['summary']['people_found'])
        results['summary']['addresses_found'] = list(results['summary']['addresses_found'])
        
        # Save processing results
        results_file = self.metadata_dir / "processing_results.json"
        with open(results_file, 'w') as f:
            json.dump(results, f, indent=2)
        
        # Generate bibliography entries
        self.generate_bibliography(results['processed'])
        
        # Generate timeline data
        self.generate_timeline(results['processed'])
        
        return results
    
    def generate_bibliography(self, documents: List[Dict]):
        """Generate bibliography.bib file from processed documents"""
        bib_path = self.base_path / "refs" / "bibliography.bib"
        bib_path.parent.mkdir(exist_ok=True)
        
        entries = []
        for doc in documents:
            if doc.get('extracted_date'):
                # Create citation key
                date_parts = doc['extracted_date'].split('-')
                doc_type = 'deed' if doc['type'] == 'deed' else 'news'
                key = f"{doc_type}_{date_parts[0]}_{doc['filename'].replace('.', '_').replace(' ', '_')}"
                
                # Create BibTeX entry
                if doc['type'] == 'deed':
                    entry = f"""@misc{{{key},
  title = {{Property Deed - 1822 Pine Street}},
  date = {{{doc['extracted_date']}}},
  note = {{Historical deed document}},
  file = {{{doc['filename']}}}
}}"""
                else:
                    # Extract publication info from text if possible
                    text_lower = doc.get('text', '').lower()
                    publication = 'Unknown Publication'
                    
                    if 'inquirer' in text_lower:
                        publication = 'The Philadelphia Inquirer'
                    elif 'times' in text_lower:
                        publication = 'The Philadelphia Times'
                    elif 'ledger' in text_lower:
                        publication = 'Evening Public Ledger'
                    
                    entry = f"""@news{{{key},
  title = {{Historical Press Clipping - 1822 Pine Street}},
  author = {{{{{publication}}}}},
  date = {{{doc['extracted_date']}}},
  note = {{Historical newspaper clipping}},
  file = {{{doc['filename']}}}
}}"""
                
                entries.append(entry)
        
        with open(bib_path, 'w') as f:
            f.write('\n\n'.join(entries))
        
        print(f"Generated bibliography with {len(entries)} entries")
    
    def generate_timeline(self, documents: List[Dict]):
        """Generate timeline.yml from processed documents"""
        timeline_path = self.base_path / "data" / "timeline.yml"
        timeline_path.parent.mkdir(exist_ok=True)
        
        events = []
        for doc in documents:
            if doc.get('extracted_date'):
                event = {
                    'date': doc['extracted_date'],
                    'type': doc['type'],
                    'description': f"Document: {doc['filename']}",
                    'source': doc['filename']
                }
                
                # Add extracted entities as additional info
                if doc.get('entities'):
                    if doc['entities'].get('people'):
                        event['people'] = doc['entities']['people'][:3]  # Top 3 people
                    if doc['entities'].get('monetary_amounts'):
                        event['amounts'] = doc['entities']['monetary_amounts']
                
                events.append(event)
        
        # Sort by date
        events.sort(key=lambda x: x['date'])
        
        timeline_data = {
            'timeline': events,
            'generated': datetime.now().isoformat()
        }
        
        with open(timeline_path, 'w') as f:
            yaml.dump(timeline_data, f, default_flow_style=False, sort_keys=False)
        
        print(f"Generated timeline with {len(events)} events")

def main():
    processor = DocumentProcessor()
    
    print("1822 Pine Street Document Processing System")
    print("=" * 50)
    print("Place your documents in the 'raw_documents' folder")
    print("Supported formats: PDF, JPG, PNG, TIFF")
    print("=" * 50)
    
    # Check if documents exist
    raw_docs = list(processor.raw_dir.glob('*'))
    if not raw_docs:
        print(f"\nNo documents found in {processor.raw_dir}")
        print("Please add your documents and run again.")
        return
    
    print(f"\nFound {len(raw_docs)} documents to process")
    response = input("Begin processing? (y/n): ")
    
    if response.lower() == 'y':
        results = processor.process_all_documents()
        
        print("\n" + "=" * 50)
        print("Processing Complete!")
        print(f"Documents processed: {results['summary']['total_documents']}")
        print(f"Dates extracted: {results['summary']['dates_extracted']}")
        print(f"People found: {len(results['summary']['people_found'])}")
        print(f"Addresses found: {len(results['summary']['addresses_found'])}")
        
        if results['errors']:
            print(f"\nErrors encountered: {len(results['errors'])}")
            for error in results['errors']:
                print(f"  - {error['filename']}: {error['error']}")

if __name__ == "__main__":
    main()