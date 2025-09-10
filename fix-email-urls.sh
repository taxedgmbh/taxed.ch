#!/bin/bash

# Fix corrupted email URLs in all JSX files
echo "🔧 Fixing corrupted email URLs..."

# List of files to fix
files=(
  "src/pages/TeamPage.jsx"
  "src/pages/IndustrySpecializationsPage.jsx"
  "src/pages/PricingPage.jsx"
  "src/pages/NotFoundPage.jsx"
  "src/pages/CaseStudiesPage.jsx"
  "src/pages/AdvancedTaxToolsPage.jsx"
  "src/pages/LawSectionPage.jsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Fixing $file..."
    
    # Replace corrupted email URL patterns with proper format
    sed -i '' 's/const emailUrl = `mailto:info@taxed\.ch\?subject=Inquiry.*`/const emailUrl = `mailto:info@taxed.ch?subject=${subject}&body=${body}`/g' "$file"
    
    # Fix any remaining corrupted patterns
    sed -i '' 's/mailto:info@taxed\.ch\?subject=Inquiry.*mailto:.*`/mailto:info@taxed.ch?subject=${subject}&body=${body}`/g' "$file"
    
    # Replace phoneNumber variables with proper email handling
    sed -i '' 's/const phoneNumber = .*/const subject = encodeURIComponent("Inquiry");\n    const body = encodeURIComponent("Hello Taxed GmbH,\\n\\nI have a question about your services. Could you please help me?");/g' "$file"
    
    # Replace WhatsApp URLs with email URLs
    sed -i '' 's/const whatsappUrl = `https:\/\/wa\.me\/\${phoneNumber}\?text=\${message}`;/const emailUrl = `mailto:info@taxed.ch?subject=${subject}&body=${body}`;/g' "$file"
    
    # Replace window.open calls
    sed -i '' 's/window\.open(whatsappUrl, '\''_blank'\'');/window.open(emailUrl, '\''_blank'\'');/g' "$file"
    
    echo "✅ Fixed $file"
  else
    echo "❌ File not found: $file"
  fi
done

echo "🎉 Email URL fixes completed!"
