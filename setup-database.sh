#!/bin/bash

# Database Setup Script for Client Portal
# Taxed.ch - Swiss Tax Consulting

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_header() {
    echo -e "${BLUE}🚀 $1${NC}"
}

# Database Configuration
DB_HOST="localhost"
DB_NAME="u497646184_taxedgmbh"
DB_USER="u497646184_taxedgmbh"
DB_PASS="Hauskauf629!"

print_header "Setting up Client Portal Database..."

# Check if MySQL client is available
if ! command -v mysql &> /dev/null; then
    print_error "MySQL client not found. Please install MySQL client or use phpMyAdmin."
    print_info "You can also run the SQL script manually in phpMyAdmin:"
    echo "   1. Go to https://taxed.ch/phpmyadmin"
    echo "   2. Select database: $DB_NAME"
    echo "   3. Run the SQL from: backend/client-portal-schema.sql"
    exit 1
fi

# Check if schema file exists
if [ ! -f "backend/client-portal-schema.sql" ]; then
    print_error "Database schema file not found: backend/client-portal-schema.sql"
    exit 1
fi

print_info "Connecting to database: $DB_NAME"

# Test database connection
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASS" -e "USE $DB_NAME;" 2>/dev/null
if [ $? -ne 0 ]; then
    print_error "Cannot connect to database. Please check your credentials."
    print_info "Database details:"
    echo "   Host: $DB_HOST"
    echo "   Database: $DB_NAME"
    echo "   User: $DB_USER"
    exit 1
fi

print_success "Database connection successful!"

print_info "Executing database schema..."

# Execute the schema
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" < backend/client-portal-schema.sql

if [ $? -eq 0 ]; then
    print_success "Database schema executed successfully!"
else
    print_error "Failed to execute database schema"
    exit 1
fi

print_info "Verifying database tables..."

# Check if tables were created
TABLES=$(mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASS" -e "SHOW TABLES;" "$DB_NAME" 2>/dev/null | grep -v "Tables_in_")

EXPECTED_TABLES=("clients" "client_sessions" "tax_cases" "documents" "messages" "appointments" "admin_users" "audit_log")

for table in "${EXPECTED_TABLES[@]}"; do
    if echo "$TABLES" | grep -q "$table"; then
        print_success "Table '$table' created successfully"
    else
        print_error "Table '$table' not found"
    fi
done

print_info "Testing admin user creation..."

# Check if admin user was created
ADMIN_COUNT=$(mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASS" -e "SELECT COUNT(*) as count FROM admin_users WHERE username='admin';" "$DB_NAME" 2>/dev/null | tail -n 1)

if [ "$ADMIN_COUNT" = "1" ]; then
    print_success "Admin user created successfully"
    print_warning "Default admin credentials:"
    echo "   Username: admin"
    echo "   Password: admin123"
    echo "   ⚠️  CHANGE THIS PASSWORD IMMEDIATELY!"
else
    print_warning "Admin user may not have been created properly"
fi

print_header "Database Setup Summary"

echo ""
print_success "🎉 Database setup completed successfully!"
echo ""
print_info "📊 Database structure:"
echo "   • clients - Client user accounts"
echo "   • client_sessions - User session management"
echo "   • tax_cases - Tax case management"
echo "   • documents - Document storage tracking"
echo "   • messages - Client-advisor communication"
echo "   • appointments - Meeting scheduling"
echo "   • admin_users - Admin user accounts"
echo "   • audit_log - Security audit trail"
echo ""
print_info "🔐 Security features:"
echo "   • Password hashing with PHP password_hash()"
echo "   • Session token management"
echo "   • Comprehensive audit logging"
echo "   • SQL injection protection"
echo ""
print_warning "⚠️  Important next steps:"
echo "   1. Change default admin password immediately"
echo "   2. Test client registration and login"
echo "   3. Deploy the backend API files"
echo "   4. Run comprehensive security testing"
echo ""
print_info "📖 See CLIENT_PORTAL_PRODUCTION_PLAN.md for detailed next steps"
echo ""
print_success "Your client portal database is ready! 🚀"
