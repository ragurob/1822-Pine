#!/usr/bin/env python3
"""
Generate a simple HTML preview of the 1822 Pine Street documentation
"""

import json
import yaml
from pathlib import Path
from datetime import datetime

def generate_html():
    base_path = Path(".")
    
    # Load timeline
    timeline_path = base_path / "data" / "timeline.yml"
    with open(timeline_path) as f:
        timeline_data = yaml.safe_load(f)
    
    # Load processing results
    results_path = base_path / "metadata" / "processing_results.json"
    with open(results_path) as f:
        results = json.load(f)
    
    # Generate HTML
    html = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>1822 Pine Street - Historical Documentation</title>
    <style>
        body {
            font-family: Georgia, 'Times New Roman', serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #fdfbf7;
        }
        h1, h2, h3 {
            color: #2c3e50;
            border-bottom: 2px solid #8b7355;
            padding-bottom: 10px;
        }
        .summary-box {
            background: white;
            border: 1px solid #e1d9d1;
            padding: 20px;
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .timeline-item {
            background: white;
            border-left: 3px solid #8b7355;
            padding: 15px;
            margin: 15px 0;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .date {
            font-weight: bold;
            color: #8b7355;
        }
        .document-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        .document-card {
            background: white;
            border: 1px solid #e1d9d1;
            padding: 10px;
            text-align: center;
        }
        .document-card img {
            max-width: 100%;
            height: auto;
            margin-bottom: 10px;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        .stat-card {
            background: white;
            padding: 15px;
            text-align: center;
            border: 1px solid #e1d9d1;
        }
        .stat-number {
            font-size: 2em;
            color: #8b7355;
            font-weight: bold;
        }
        .stat-label {
            color: #666;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <h1>1822 Pine Street - Historical Documentation</h1>
    
    <div class="summary-box">
        <h2>Processing Summary</h2>
        <div class="stats">
            <div class="stat-card">
                <div class="stat-number">""" + str(results['summary']['total_documents']) + """</div>
                <div class="stat-label">Documents Processed</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">""" + str(results['summary']['dates_extracted']) + """</div>
                <div class="stat-label">Dates Extracted</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">""" + str(results['summary']['deeds']) + """</div>
                <div class="stat-label">Property Deeds</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">""" + str(results['summary']['clippings']) + """</div>
                <div class="stat-label">News Clippings</div>
            </div>
        </div>
    </div>
    
    <h2>Historical Timeline</h2>
    <div class="timeline">
"""
    
    # Add timeline items
    for event in timeline_data['timeline'][:20]:  # Show first 20 events
        html += f"""
        <div class="timeline-item">
            <div class="date">{event['date']}</div>
            <div class="description">{event['description']}</div>
            <div class="source">Source: {event['source']}</div>
        </div>
"""
    
    html += """
    </div>
    
    <h2>Document Gallery Sample</h2>
    <div class="document-grid">
"""
    
    # Add sample documents
    for doc in results['processed'][:12]:  # Show first 12 documents
        if doc.get('images'):
            web_image = doc['images'][0]['web']
            html += f"""
        <div class="document-card">
            <img src="{web_image}" alt="{doc['filename']}">
            <div>{doc['filename'][:30]}...</div>
            <div style="font-size: 0.8em; color: #666;">{doc.get('extracted_date', 'Undated')}</div>
        </div>
"""
    
    html += """
    </div>
    
    <h2>Key Findings</h2>
    <div class="summary-box">
        <h3>Date Range</h3>
        <p>Documents span from <strong>1824</strong> to <strong>1952</strong>, covering over 125 years of history.</p>
        
        <h3>Document Types</h3>
        <ul>
            <li>Historical newspaper clippings from The Philadelphia Inquirer, The Philadelphia Times, Evening Public Ledger, and The Evening Telegraph</li>
            <li>Property deeds and abstracts from 1893 to 1952</li>
            <li>Architectural floor plans for all levels</li>
            <li>Modern property documentation (1979-2013)</li>
        </ul>
        
        <h3>Notable Events Documented</h3>
        <ul>
            <li>1891 - Scarlet fever tragedy at the property</li>
            <li>1901 - Wedding celebrations and social events</li>
            <li>1905 - Fireplace installation</li>
            <li>1915 - Suffrage movement connections</li>
        </ul>
    </div>
    
    <footer style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #e1d9d1; color: #666;">
        <p>Generated: """ + datetime.now().strftime("%Y-%m-%d %H:%M") + """</p>
        <p>1822 Pine Street Historical Documentation Project</p>
    </footer>
</body>
</html>
"""
    
    # Save HTML
    output_path = base_path / "preview.html"
    with open(output_path, 'w') as f:
        f.write(html)
    
    print(f"HTML preview generated: {output_path}")
    print(f"Open in browser: file://{output_path.absolute()}")

if __name__ == "__main__":
    generate_html()