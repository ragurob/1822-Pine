#!/bin/bash

# Setup script for 1822 Pine Street Documentation System
echo "Setting up 1822 Pine Street documentation system..."

# Check for Homebrew
if ! command -v brew &> /dev/null; then
    echo "Please install Homebrew first: https://brew.sh"
    exit 1
fi

# Install required tools
echo "Installing required tools..."

# Quarto for document generation
if ! command -v quarto &> /dev/null; then
    echo "Installing Quarto..."
    brew install quarto
fi

# ImageMagick for image processing
if ! command -v convert &> /dev/null; then
    echo "Installing ImageMagick..."
    brew install imagemagick
fi

# Poppler for PDF utilities
if ! command -v pdftotext &> /dev/null; then
    echo "Installing Poppler..."
    brew install poppler
fi

# Tesseract for OCR
if ! command -v tesseract &> /dev/null; then
    echo "Installing Tesseract OCR..."
    brew install tesseract
fi

# Python dependencies
echo "Installing Python dependencies..."
pip3 install --user pillow pypdf2 pytesseract pyyaml pandas

# Install Quarto PDF support
echo "Installing TinyTeX for PDF support..."
quarto install tinytex --update-path

echo "Setup complete!"