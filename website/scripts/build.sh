#!/bin/bash

# Build script for The Rittenhouse Residence website
# Usage: ./scripts/build.sh [development|production]

set -e  # Exit on error

MODE=${1:-development}

echo "Building site in $MODE mode..."

# Clean previous builds
echo "Cleaning previous builds..."
rm -rf _site
rm -rf .quarto

# Copy images to proper location
echo "Organizing images..."
if [ -d "images/property" ]; then
    echo "Found $(ls images/property/*.jpg 2>/dev/null | wc -l) property images"
fi

# Build the site
if [ "$MODE" = "production" ]; then
    echo "Building for production..."
    quarto render --execute-daemon-restart
    
    # Optimize images if ImageMagick is installed
    if command -v convert &> /dev/null; then
        echo "Optimizing images..."
        for img in _site/images/property/*.jpg; do
            if [ -f "$img" ]; then
                convert "$img" -quality 85 -resize 1600x1600\> "$img"
            fi
        done
    fi
    
    # Generate sitemap if not already done
    if [ ! -f "_site/sitemap.xml" ]; then
        echo "Generating sitemap..."
        # Quarto should generate this automatically
    fi
    
    echo "Production build complete!"
    echo "Site ready in _site/"
    
else
    echo "Building for development..."
    quarto render
    echo "Development build complete!"
fi

# Check build
if [ -f "_site/index.html" ]; then
    echo "✅ Build successful!"
    echo "Files in _site/:"
    ls -la _site/ | head -10
else
    echo "❌ Build failed - index.html not found"
    exit 1
fi

# Optional: Start preview server
if [ "$MODE" = "development" ]; then
    read -p "Start preview server? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        quarto preview
    fi
fi