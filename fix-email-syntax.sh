#!/bin/bash

echo "🔧 Fixing email syntax errors..."

# Fix PricingPage.jsx
echo "Fixing PricingPage.jsx..."
sed -i '' 's/const emailUrl = `mailto:info@taxed\.ch\?subject=\${subject}const whatsappUrl = `https:\/\/wa\.me\/\${phoneNumber}\?text=\${message}`;body=\${body}`;/const emailUrl = `mailto:info@taxed.ch?subject=${subject}&body=${body}`;/g' src/pages/PricingPage.jsx

# Fix all files with corrupted email URLs
for file in src/pages/*.jsx; do
  if [ -f "$file" ]; then
    echo "Cleaning $file..."
    
    # Remove corrupted email URL lines
    sed -i '' '/const emailUrl = `mailto:info@taxed\.ch\?subject=Inquiry.*`/d' "$file"
    sed -i '' '/const emailUrl = `mailto:info@taxed\.ch\?subject=.*mailto:/d' "$file"
    sed -i '' '/const emailUrl = `mailto:info@taxed\.ch\?subject=.*whatsappUrl/d' "$file"
    
    # Fix any remaining corrupted patterns
    sed -i '' 's/mailto:info@taxed\.ch\?subject=.*mailto:.*`/mailto:info@taxed.ch?subject=${subject}&body=${body}`/g' "$file"
    
    echo "✅ Cleaned $file"
  fi
done

echo "🎉 Email syntax fixes completed!"
