#!/bin/bash

# Build and View Script for 1822 Pine Website
# Run this script to build and open the website

echo "=========================================="
echo "1822 Pine Street Website Build Script"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "website/_quarto.yml" ]; then
    echo "Error: Not in the 1822-pine directory!"
    echo "Please cd to /Users/robertsonmprice/Documents/GitHub/1822 Pine/1822-pine"
    exit 1
fi

# Option 1: Try to use Quarto if installed
if command -v quarto &> /dev/null; then
    echo "✅ Quarto found! Building website..."
    cd website
    quarto render
    echo ""
    echo "✅ Build complete!"
    echo ""
    echo "Opening website in browser..."
    open _site/index.html
    echo ""
    echo "=========================================="
    echo "Website is now open in your browser!"
    echo "Local URL: file://$(pwd)/_site/index.html"
    echo "=========================================="
else
    echo "⚠️  Quarto is not installed."
    echo ""
    echo "To install Quarto, you have two options:"
    echo ""
    echo "OPTION 1: Install via Homebrew (recommended)"
    echo "   Run: brew install quarto"
    echo "   Note: You'll need to enter your password when prompted"
    echo ""
    echo "OPTION 2: Download from quarto.org"
    echo "   1. Visit: https://quarto.org/docs/get-started/"
    echo "   2. Download the macOS installer"
    echo "   3. Run the installer"
    echo ""
    echo "After installing Quarto, run this script again."
    echo ""
    echo "=========================================="
    echo "For now, here are the key files you can view:"
    echo ""
    echo "Main Pages (open these HTML files in a browser):"
    echo "  - Homepage: website/index.qmd"
    echo "  - Gallery: website/gallery.qmd" 
    echo "  - Rates: website/rates.qmd"
    echo "  - History Book: website/history-book.qmd"
    echo ""
    echo "The actual rendered site will be in: website/_site/"
    echo "after Quarto is installed and you run this script."
fi