#!/usr/bin/env python3
"""
Extract meaningful titles and content from processed documents for bibliography
"""

import json
import re
from pathlib import Path
from typing import Dict, List

def clean_text(text: str) -> str:
    """Clean OCR text for readability"""
    # Remove multiple spaces and newlines
    text = re.sub(r'\s+', ' ', text)
    # Remove Newspapers.com watermarks
    text = re.sub(r'Downloaded on.*?(?=\w)', '', text)
    text = re.sub(r'Clipped By:.*?(?=\w)', '', text)
    text = re.sub(r'Copyright.*?Reserved\.', '', text)
    return text.strip()

def extract_headline(text: str, filename: str) -> str:
    """Try to extract a meaningful headline from the document"""
    # Look for common patterns in the text
    patterns = [
        r'(SPENCER[^.]*scarlet fever[^.]*)',  # Death notices
        r'(Wedding[^.]*1822 Pine[^.]*)',       # Weddings
        r'(Mrs\.[^.]*1822 Pine[^.]*)',         # Society mentions
        r'(Building Permits[^.]*1822 Pine[^.]*)',  # Building permits
        r'(At Home[^.]*Davis[^.]*)',           # At Home events
    ]
    
    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            return match.group(1)[:100]  # Limit length
    
    # Default to filename-based title
    if 'scarlet' in filename.lower():
        return "Death Notice: Howard Spencer Jr., scarlet fever at 1822 Pine"
    elif 'wedding' in filename.lower() or 'plumb' in filename.lower():
        return "Society: Wedding announcement"
    elif 'deed' in filename.lower():
        return f"Property Deed: Transfer of 1822 Pine Street"
    
    return "Historical document: 1822 Pine Street"

def process_all_metadata():
    """Process all metadata files to extract content for bibliography"""
    metadata_dir = Path("metadata")
    results = []
    
    for meta_file in metadata_dir.glob("*_metadata.json"):
        if meta_file.name == "processing_results.json":
            continue
            
        with open(meta_file) as f:
            data = json.load(f)
        
        # Skip non-historical documents (modern deeds, floor plans)
        if any(year in data['filename'] for year in ['1979', '1985', '1987', '1999', '2002', '2013']):
            continue
        if 'Floor' in data['filename'] or 'Roof' in data['filename']:
            continue
            
        # Extract meaningful content
        text = clean_text(data.get('text', ''))
        headline = extract_headline(text, data['filename'])
        
        # Determine publication
        publication = "Unknown Publication"
        if 'inquirer' in data['filename'].lower():
            publication = "The Philadelphia Inquirer"
        elif 'times' in data['filename'].lower():
            publication = "The Philadelphia Times"
        elif 'telegraph' in data['filename'].lower():
            publication = "The Evening Telegraph"
        elif 'ledger' in data['filename'].lower():
            publication = "Evening Public Ledger"
        elif 'gazette' in data['filename'].lower():
            publication = "The United States Gazette"
        
        # Extract page number from filename
        page_match = re.search(r'Page[_ ](\d+)', data['filename'])
        page = page_match.group(1) if page_match else "n.p."
        
        # Get URL from text if available
        url_match = re.search(r'https://www\.newspapers\.com/[^\s]+', data.get('text', ''))
        url = url_match.group(0) if url_match else "https://www.newspapers.com/"
        
        results.append({
            'filename': data['filename'],
            'date': data.get('extracted_date', 'undated'),
            'headline': headline,
            'publication': publication,
            'page': page,
            'url': url,
            'type': data.get('type', 'clipping')
        })
    
    return sorted(results, key=lambda x: x['date'] if x['date'] else '0000-00-00')

def generate_bibliography(entries: List[Dict]) -> str:
    """Generate BibTeX bibliography entries"""
    bib_content = []
    
    for entry in entries:
        if not entry['date'] or entry['date'] == 'undated':
            continue
            
        # Create citation key
        date_clean = entry['date'].replace('-', '_')
        key_base = entry['filename'].replace('.pdf', '').replace('.jpg', '').replace(' ', '_').replace('-', '_')
        
        if entry['type'] == 'deed':
            citation_key = f"deed_{date_clean}_{key_base}"
            bib_entry = f"""@misc{{{citation_key},
  title = {{{entry['headline']}}},
  date = {{{entry['date']}}},
  note = {{Property deed document}},
  file = {{{entry['filename']}}}
}}"""
        else:
            citation_key = f"news_{date_clean}_{key_base}"
            bib_entry = f"""@article{{{citation_key},
  title = {{{entry['headline']}}},
  author = {{{{{entry['publication']}}}}},
  date = {{{entry['date']}}},
  url = {{{entry['url']}}},
  note = {{p. {entry['page']}}},
  file = {{{entry['filename']}}}
}}"""
        
        bib_content.append(bib_entry)
    
    return "\n\n".join(bib_content)

def main():
    print("Extracting content from all historical documents...")
    entries = process_all_metadata()
    
    print(f"Found {len(entries)} historical documents")
    
    # Generate bibliography
    bibliography = generate_bibliography(entries)
    
    # Save to file
    bib_path = Path("refs/bibliography_enhanced.bib")
    bib_path.parent.mkdir(exist_ok=True)
    
    with open(bib_path, 'w') as f:
        f.write(bibliography)
    
    print(f"Enhanced bibliography saved to {bib_path}")
    
    # Print sample entries
    print("\nSample entries:")
    for entry in entries[:5]:
        print(f"  {entry['date']}: {entry['headline'][:60]}...")

if __name__ == "__main__":
    main()