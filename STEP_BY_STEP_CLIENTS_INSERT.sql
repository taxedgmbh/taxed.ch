-- STEP 1: INSERT SAMPLE CLIENTS INTO THE CLIENTS TABLE
-- This script will insert 8 sample clients with realistic Swiss data

INSERT INTO clients (email, password_hash, first_name, last_name, company, phone, address, city, postal_code, country, tax_id, status) VALUES
('john.doe@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'John', 'Doe', 'Doe Consulting AG', '+41 44 123 4567', 'Bahnhofstrasse 1', 'Zürich', '8001', 'Switzerland', 'CHE-123.456.789', 'active'),
('jane.smith@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Jane', 'Smith', NULL, '+41 22 987 6543', 'Rue du Rhône 10', 'Geneva', '1204', 'Switzerland', 'CHE-987.654.321', 'active'),
('robert.johnson@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Robert', 'Johnson', 'Johnson & Partners', '+41 21 555 1234', 'Avenue de la Gare 5', 'Lausanne', '1003', 'Switzerland', 'CHE-456.789.123', 'active'),
('sarah.wilson@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Sarah', 'Wilson', NULL, '+41 31 777 8888', 'Marktgasse 15', 'Bern', '3000', 'Switzerland', 'CHE-789.123.456', 'active'),
('michael.brown@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Michael', 'Brown', 'Brown Industries SA', '+41 41 999 0000', 'Pilatusstrasse 20', 'Lucerne', '6003', 'Switzerland', 'CHE-321.654.987', 'active'),
('emma.davis@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Emma', 'Davis', NULL, '+41 61 111 2222', 'Freie Strasse 25', 'Basel', '4001', 'Switzerland', 'CHE-654.321.789', 'active'),
('david.miller@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'David', 'Miller', 'Miller Tech GmbH', '+41 71 333 4444', 'St. Leonhardstrasse 30', 'St. Gallen', '9000', 'Switzerland', 'CHE-147.258.369', 'active'),
('lisa.garcia@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Lisa', 'Garcia', NULL, '+41 81 555 6666', 'Via Nassa 35', 'Lugano', '6900', 'Switzerland', 'CHE-369.258.147', 'active');

-- VERIFICATION QUERY: Check if clients were inserted successfully
SELECT id, email, first_name, last_name, company, city, status FROM clients ORDER BY id;
