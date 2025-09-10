#!/usr/bin/env python3
"""
Direct Database Connection Script
Taxed.ch - Swiss Tax Consulting
This script will connect directly to your MySQL database and insert sample data
"""

import sys
import os

# Try to import required modules
try:
    import pymysql
    print("✅ PyMySQL module found")
except ImportError:
    print("❌ PyMySQL not found. Installing...")
    os.system("pip3 install pymysql")
    import pymysql

# Database configuration
DB_CONFIG = {
    'host': 'localhost',
    'user': 'u497646184_taxedgmbh',
    'password': 'Hauskauf629!',
    'database': 'u497646184_taxedgmbh',
    'charset': 'utf8mb4'
}

def connect_to_database():
    """Connect to the MySQL database"""
    try:
        connection = pymysql.connect(**DB_CONFIG)
        print(f"✅ Successfully connected to database: {DB_CONFIG['database']}")
        return connection
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return None

def show_tables(connection):
    """Show all tables in the database"""
    try:
        with connection.cursor() as cursor:
            cursor.execute("SHOW TABLES;")
            tables = cursor.fetchall()
            print(f"\n📊 Tables in database:")
            for table in tables:
                print(f"  - {table[0]}")
            return [table[0] for table in tables]
    except Exception as e:
        print(f"❌ Error showing tables: {e}")
        return []

def check_table_structure(connection, table_name):
    """Check the structure of a specific table"""
    try:
        with connection.cursor() as cursor:
            cursor.execute(f"DESCRIBE {table_name};")
            columns = cursor.fetchall()
            print(f"\n📋 Structure of table '{table_name}':")
            for column in columns:
                print(f"  - {column[0]} ({column[1]})")
            return columns
    except Exception as e:
        print(f"❌ Error checking table structure: {e}")
        return []

def insert_sample_clients(connection):
    """Insert sample clients into the database"""
    clients_data = [
        ('john.doe@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'John', 'Doe', 'Doe Consulting AG', '+41 44 123 4567', 'Bahnhofstrasse 1', 'Zürich', '8001', 'Switzerland', 'CHE-123.456.789', 'active'),
        ('jane.smith@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Jane', 'Smith', None, '+41 22 987 6543', 'Rue du Rhône 10', 'Geneva', '1204', 'Switzerland', 'CHE-987.654.321', 'active'),
        ('robert.johnson@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Robert', 'Johnson', 'Johnson & Partners', '+41 21 555 1234', 'Avenue de la Gare 5', 'Lausanne', '1003', 'Switzerland', 'CHE-456.789.123', 'active'),
        ('sarah.wilson@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Sarah', 'Wilson', None, '+41 31 777 8888', 'Marktgasse 15', 'Bern', '3000', 'Switzerland', 'CHE-789.123.456', 'active'),
        ('michael.brown@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Michael', 'Brown', 'Brown Industries SA', '+41 41 999 0000', 'Pilatusstrasse 20', 'Lucerne', '6003', 'Switzerland', 'CHE-321.654.987', 'active'),
        ('emma.davis@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Emma', 'Davis', None, '+41 61 111 2222', 'Freie Strasse 25', 'Basel', '4001', 'Switzerland', 'CHE-654.321.789', 'active'),
        ('david.miller@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'David', 'Miller', 'Miller Tech GmbH', '+41 71 333 4444', 'St. Leonhardstrasse 30', 'St. Gallen', '9000', 'Switzerland', 'CHE-147.258.369', 'active'),
        ('lisa.garcia@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Lisa', 'Garcia', None, '+41 81 555 6666', 'Via Nassa 35', 'Lugano', '6900', 'Switzerland', 'CHE-369.258.147', 'active')
    ]
    
    try:
        with connection.cursor() as cursor:
            # Check if clients table exists
            cursor.execute("SHOW TABLES LIKE 'clients';")
            if not cursor.fetchone():
                print("❌ 'clients' table does not exist!")
                return False
            
            # Insert clients data
            insert_query = """
            INSERT INTO clients (email, password_hash, first_name, last_name, company, phone, address, city, postal_code, country, tax_id, status) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE email=email
            """
            
            cursor.executemany(insert_query, clients_data)
            connection.commit()
            
            print(f"✅ Successfully inserted {len(clients_data)} sample clients")
            return True
            
    except Exception as e:
        print(f"❌ Error inserting clients: {e}")
        return False

def verify_clients_insertion(connection):
    """Verify that clients were inserted correctly"""
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT id, email, first_name, last_name, company, city, status FROM clients ORDER BY id;")
            clients = cursor.fetchall()
            
            print(f"\n👥 Sample clients in database:")
            for client in clients:
                print(f"  ID {client[0]}: {client[2]} {client[3]} ({client[1]}) - {client[4] or 'Individual'} - {client[5]} - {client[6]}")
            
            return len(clients)
            
    except Exception as e:
        print(f"❌ Error verifying clients: {e}")
        return 0

def main():
    """Main function"""
    print("🚀 Taxed.ch Database Connection Script")
    print("=" * 50)
    
    # Connect to database
    connection = connect_to_database()
    if not connection:
        return
    
    try:
        # Show tables
        tables = show_tables(connection)
        
        # Check clients table structure
        if 'clients' in tables:
            check_table_structure(connection, 'clients')
            
            # Insert sample clients
            if insert_sample_clients(connection):
                # Verify insertion
                count = verify_clients_insertion(connection)
                print(f"\n🎉 SUCCESS: {count} clients in database")
            else:
                print("\n❌ Failed to insert clients")
        else:
            print("❌ 'clients' table not found in database")
            
    finally:
        connection.close()
        print("\n🔌 Database connection closed")

if __name__ == "__main__":
    main()
