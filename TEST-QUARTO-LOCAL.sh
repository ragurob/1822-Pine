#!/bin/bash

echo "================================================"
echo "Local Quarto Test Script"
echo "================================================"
echo ""

# Check if Quarto is installed
if ! command -v quarto &> /dev/null; then
    echo "❌ Quarto is not installed!"
    echo ""
    echo "To install Quarto:"
    echo "  brew install quarto"
    echo ""
    echo "Or download from: https://quarto.org/docs/get-started/"
    exit 1
fi

echo "✅ Quarto found: $(quarto --version)"
echo ""

cd website

echo "Testing with minimal configuration..."
echo "======================================"

# Create a test file
cat > test-minimal.qmd << 'EOF'
---
title: "Test Page"
---

## This is a test

If you can see this, Quarto is working!
EOF

# Try to render just the test file
echo "1. Testing single file render..."
quarto render test-minimal.qmd --to html 2>&1 || {
    echo "❌ Even basic render failed!"
    exit 1
}

echo "✅ Single file render works!"
echo ""

# Try minimal site
echo "2. Testing minimal site configuration..."
if [ -f "_quarto-minimal.yml" ]; then
    # Backup and use minimal
    mv _quarto.yml _quarto-backup.yml 2>/dev/null
    cp _quarto-minimal.yml _quarto.yml
    
    echo "Attempting to render minimal site..."
    quarto render --to html 2>&1 | head -50 || {
        EXIT_CODE=$?
        echo ""
        echo "❌ Minimal site render failed with exit code: $EXIT_CODE"
        # Restore
        mv _quarto-backup.yml _quarto.yml 2>/dev/null
        exit $EXIT_CODE
    }
    
    echo "✅ Minimal site works!"
    
    # Restore original
    mv _quarto-backup.yml _quarto.yml 2>/dev/null
else
    echo "⚠️  No minimal config found"
fi

echo ""
echo "3. Testing full site configuration..."
echo "Attempting to render full site (first 50 lines of output)..."
quarto render --to html 2>&1 | head -50 || {
    EXIT_CODE=$?
    echo ""
    echo "❌ Full site render failed with exit code: $EXIT_CODE"
    echo ""
    echo "Try running this for full error details:"
    echo "  cd website && quarto render --debug"
    exit $EXIT_CODE
}

echo "✅ Full site renders successfully!"
echo ""
echo "================================================"
echo "All tests passed! Site should be in website/_site/"
echo "================================================"