# 1822 Pine Street Historical Documentation System

A comprehensive system for documenting and publishing the history of 1822 Pine Street, Philadelphia.

## Quick Start

### 1. Install Dependencies

```bash
# Run the setup script
chmod +x setup.sh
./setup.sh

# Install Quarto's PDF support
quarto install tinytex
```

### 2. Process Your Documents

1. Place all your historical documents (PDFs, JPGs, PNGs) in the `raw_documents/` folder
2. Run the processing script:

```bash
python3 scripts/process_documents.py
```

This will:
- Extract text using OCR
- Identify dates, people, and locations
- Generate web and print-optimized images
- Create bibliography entries
- Build timeline data

### 3. Build the Documentation

```bash
# Preview the website locally
quarto preview

# Generate PDF book
quarto render --to pdf

# Generate all formats
quarto render
```

## Project Structure

```
1822-pine/
├── raw_documents/        # Place your original documents here
├── images/
│   ├── web/             # Web-optimized images (auto-generated)
│   └── print/           # High-res print images (auto-generated)
├── metadata/            # Extracted metadata and OCR text
├── data/
│   └── timeline.yml     # Auto-generated timeline
├── refs/
│   └── bibliography.bib # Auto-generated citations
├── chapters/            # Markdown content files
└── _site/              # Generated website and PDFs
```

## Adding Documents

Simply drop new documents into `raw_documents/` and run:

```bash
python3 scripts/process_documents.py
```

The system will:
1. Automatically extract metadata
2. Perform OCR on images and PDFs
3. Generate citations
4. Update the timeline
5. Create optimized versions for web and print

## Document Naming Convention

For best results, name your files with dates when possible:
- `1891-04-23-inquirer-spencer-obituary.jpg`
- `1905-deed-transfer.pdf`
- `1915-01-08-suffrage-meeting.png`

## Publishing

### GitHub Pages
```bash
quarto publish gh-pages
```

### Manual Deployment
Upload the `_site/` folder to any web host.

## Features

- **Automatic OCR**: Extracts text from all documents
- **Metadata Extraction**: Identifies dates, names, addresses, monetary amounts
- **Multi-format Output**: Website, PDF book, and EPUB
- **Responsive Design**: Works on all devices
- **Print-ready**: Generates high-quality PDFs for physical books
- **Timeline Generation**: Automatic chronological organization
- **Bibliography Management**: Proper citations for all sources
- **Image Optimization**: Separate versions for web and print

## Customization

### Styling
Edit `styles/theme.css` for visual customization.

### Content Structure
Modify `_quarto.yml` to change chapter organization.

### Metadata Extraction
Enhance `scripts/process_documents.py` to extract additional fields.

## Requirements

- macOS or Linux (Windows with WSL)
- Python 3.7+
- Quarto
- ImageMagick
- Tesseract OCR
- Poppler (for PDF processing)

## Support

For issues or questions about the historical content, please review the documentation in the `refs/` folder.

For technical issues with the system, check that all dependencies are installed correctly.

## License

This documentation system is provided for historical preservation purposes. All historical documents remain the property of their respective copyright holders where applicable. Documents over 100 years old are generally in the public domain.