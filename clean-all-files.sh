#!/bin/bash

echo "🧹 Cleaning all corrupted email URLs..."

# Function to clean a file
clean_file() {
  local file="$1"
  echo "Cleaning $file..."
  
  # Create a backup
  cp "$file" "$file.backup"
  
  # Remove all corrupted email URL lines and replace with clean ones
  sed -i '' '/const emailUrl = `mailto:info@taxed\.ch\?subject=Inquiry.*`/d' "$file"
  sed -i '' '/const emailUrl = `mailto:info@taxed\.ch\?subject=.*mailto:/d' "$file"
  
  # Find onClick handlers and replace them with clean email handlers
  sed -i '' 's/onClick={() => {[^}]*const phoneNumber[^}]*}}/onClick={() => {\n                  const subject = encodeURIComponent("Inquiry");\n                  const body = encodeURIComponent("Hello Taxed GmbH,\\n\\nI have a question about your services. Could you please help me?");\n                  const emailUrl = `mailto:info@taxed.ch?subject=${subject}&body=${body}`;\n                  window.open(emailUrl, '\''_blank'\'');\n                }}/g' "$file"
  
  echo "✅ Cleaned $file"
}

# Clean all problematic files
files=(
  "src/pages/TeamPage.jsx"
  "src/pages/IndustrySpecializationsPage.jsx"
  "src/pages/PricingPage.jsx"
  "src/pages/NotFoundPage.jsx"
  "src/pages/CaseStudiesPage.jsx"
  "src/pages/AdvancedTaxToolsPage.jsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    clean_file "$file"
  fi
done

echo "🎉 All files cleaned!"
