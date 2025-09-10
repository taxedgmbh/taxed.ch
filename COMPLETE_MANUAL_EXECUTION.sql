-- COMPLETE SAMPLE DATA INSERTION SCRIPT
-- Taxed.ch - Swiss Tax Consulting
-- Execute this entire script in phpMyAdmin

-- Step 1: Insert additional admin users
INSERT INTO admin_users (username, email, password_hash, first_name, last_name, role) VALUES
('taxadvisor1', 'advisor1@taxed.ch', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Maria', 'Schmidt', 'tax_advisor'),
('taxadvisor2', 'advisor2@taxed.ch', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Thomas', 'Müller', 'tax_advisor'),
('assistant1', 'assistant1@taxed.ch', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Anna', 'Weber', 'assistant')
ON DUPLICATE KEY UPDATE username=username;

-- Step 2: Insert sample clients
INSERT INTO clients (email, password_hash, first_name, last_name, company, phone, address, city, postal_code, country, tax_id, status) VALUES
('john.doe@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'John', 'Doe', 'Doe Consulting AG', '+41 44 123 4567', 'Bahnhofstrasse 1', 'Zürich', '8001', 'Switzerland', 'CHE-123.456.789', 'active'),
('jane.smith@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Jane', 'Smith', NULL, '+41 22 987 6543', 'Rue du Rhône 10', 'Geneva', '1204', 'Switzerland', 'CHE-987.654.321', 'active'),
('robert.johnson@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Robert', 'Johnson', 'Johnson & Partners', '+41 21 555 1234', 'Avenue de la Gare 5', 'Lausanne', '1003', 'Switzerland', 'CHE-456.789.123', 'active'),
('sarah.wilson@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Sarah', 'Wilson', NULL, '+41 31 777 8888', 'Marktgasse 15', 'Bern', '3000', 'Switzerland', 'CHE-789.123.456', 'active'),
('michael.brown@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Michael', 'Brown', 'Brown Industries SA', '+41 41 999 0000', 'Pilatusstrasse 20', 'Lucerne', '6003', 'Switzerland', 'CHE-321.654.987', 'active'),
('emma.davis@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Emma', 'Davis', NULL, '+41 61 111 2222', 'Freie Strasse 25', 'Basel', '4001', 'Switzerland', 'CHE-654.321.789', 'active'),
('david.miller@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'David', 'Miller', 'Miller Tech GmbH', '+41 71 333 4444', 'St. Leonhardstrasse 30', 'St. Gallen', '9000', 'Switzerland', 'CHE-147.258.369', 'active'),
('lisa.garcia@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Lisa', 'Garcia', NULL, '+41 81 555 6666', 'Via Nassa 35', 'Lugano', '6900', 'Switzerland', 'CHE-369.258.147', 'active')
ON DUPLICATE KEY UPDATE email=email;

-- Step 3: Insert sample tax cases
INSERT INTO tax_cases (client_id, case_number, tax_year, case_type, status, priority, description, assigned_to, due_date, created_at) VALUES
(1, 'TC-2024-001', 2024, 'individual', 'in_progress', 'high', 'Individual tax return for 2024 - John Doe', 'Maria Schmidt', '2025-03-31', '2024-01-15 09:00:00'),
(1, 'TC-2023-002', 2023, 'individual', 'completed', 'medium', 'Individual tax return for 2023 - John Doe', 'Maria Schmidt', '2024-03-31', '2023-12-01 10:30:00'),
(2, 'TC-2024-003', 2024, 'expat', 'pending', 'high', 'Expatriate tax return for 2024 - Jane Smith', 'Thomas Müller', '2025-03-31', '2024-01-20 14:15:00'),
(3, 'TC-2024-004', 2024, 'corporate', 'in_progress', 'urgent', 'Corporate tax return for Johnson & Partners', 'Maria Schmidt', '2025-03-31', '2024-01-10 11:45:00'),
(4, 'TC-2024-005', 2024, 'individual', 'completed', 'low', 'Individual tax return for 2024 - Sarah Wilson', 'Thomas Müller', '2025-03-31', '2024-01-05 16:20:00'),
(5, 'TC-2024-006', 2024, 'corporate', 'pending', 'medium', 'Corporate tax return for Brown Industries SA', 'Anna Weber', '2025-03-31', '2024-01-25 13:10:00'),
(6, 'TC-2024-007', 2024, 'individual', 'in_progress', 'high', 'Individual tax return for 2024 - Emma Davis', 'Maria Schmidt', '2025-03-31', '2024-01-18 15:30:00'),
(7, 'TC-2024-008', 2024, 'corporate', 'completed', 'medium', 'Corporate tax return for Miller Tech GmbH', 'Thomas Müller', '2025-03-31', '2024-01-12 12:00:00'),
(8, 'TC-2024-009', 2024, 'expat', 'in_progress', 'high', 'Expatriate tax return for 2024 - Lisa Garcia', 'Anna Weber', '2025-03-31', '2024-01-22 10:45:00');

-- Step 4: Insert sample documents
INSERT INTO documents (client_id, case_id, filename, original_filename, file_path, file_size, mime_type, document_type, description, uploaded_by, created_at) VALUES
(1, 1, 'tax_return_2024_john_doe.pdf', 'tax_return_2024.pdf', '/documents/tax_returns/tax_return_2024_john_doe.pdf', 245760, 'application/pdf', 'tax_return', '2024 Individual Tax Return', 'client', '2024-01-15 09:30:00'),
(1, 1, 'salary_certificate_2024.pdf', 'salary_certificate.pdf', '/documents/salary/salary_certificate_2024.pdf', 128000, 'application/pdf', 'receipt', '2024 Salary Certificate', 'client', '2024-01-15 09:35:00'),
(1, 1, 'bank_statements_2024.pdf', 'bank_statements.pdf', '/documents/bank/bank_statements_2024.pdf', 512000, 'application/pdf', 'receipt', '2024 Bank Statements', 'client', '2024-01-15 09:40:00'),
(2, 3, 'expat_form_2024.pdf', 'expat_form.pdf', '/documents/expat/expat_form_2024.pdf', 189440, 'application/pdf', 'tax_return', '2024 Expatriate Tax Form', 'client', '2024-01-20 14:30:00'),
(2, 3, 'work_permit_2024.pdf', 'work_permit.pdf', '/documents/work_permit/work_permit_2024.pdf', 96768, 'application/pdf', 'contract', '2024 Work Permit', 'client', '2024-01-20 14:35:00'),
(3, 4, 'corporate_tax_return_2024.pdf', 'corporate_tax_return.pdf', '/documents/corporate/corporate_tax_return_2024.pdf', 384000, 'application/pdf', 'tax_return', '2024 Corporate Tax Return', 'client', '2024-01-10 12:00:00'),
(3, 4, 'financial_statements_2024.pdf', 'financial_statements.pdf', '/documents/financial/financial_statements_2024.pdf', 768000, 'application/pdf', 'receipt', '2024 Financial Statements', 'client', '2024-01-10 12:05:00'),
(4, 5, 'individual_tax_return_2024.pdf', 'individual_tax_return.pdf', '/documents/individual/individual_tax_return_2024.pdf', 201728, 'application/pdf', 'tax_return', '2024 Individual Tax Return', 'client', '2024-01-05 16:30:00'),
(5, 6, 'corporate_documents_2024.pdf', 'corporate_documents.pdf', '/documents/corporate/corporate_documents_2024.pdf', 456192, 'application/pdf', 'tax_return', '2024 Corporate Documents', 'client', '2024-01-25 13:20:00'),
(6, 7, 'tax_return_2024_emma.pdf', 'tax_return_2024.pdf', '/documents/individual/tax_return_2024_emma.pdf', 223232, 'application/pdf', 'tax_return', '2024 Individual Tax Return', 'client', '2024-01-18 15:45:00'),
(7, 8, 'corporate_tax_2024.pdf', 'corporate_tax.pdf', '/documents/corporate/corporate_tax_2024.pdf', 298496, 'application/pdf', 'tax_return', '2024 Corporate Tax Return', 'client', '2024-01-12 12:15:00'),
(8, 9, 'expat_tax_return_2024.pdf', 'expat_tax_return.pdf', '/documents/expat/expat_tax_return_2024.pdf', 175104, 'application/pdf', 'tax_return', '2024 Expatriate Tax Return', 'client', '2024-01-22 11:00:00');

-- Step 5: Insert sample messages
INSERT INTO messages (client_id, case_id, sender_type, subject, message, is_read, created_at) VALUES
(1, 1, 'admin', 'Tax Return Status Update', 'Dear Mr. Doe,\n\nI have reviewed your 2024 tax return documents. Everything looks good so far. I need one additional document - your investment income statement for 2024.\n\nPlease upload this document as soon as possible.\n\nBest regards,\nMaria Schmidt', false, '2024-01-16 10:00:00'),
(1, 1, 'client', 'Re: Tax Return Status Update', 'Dear Maria,\n\nThank you for the update. I will upload the investment income statement today.\n\nBest regards,\nJohn Doe', true, '2024-01-16 14:30:00'),
(2, 3, 'admin', 'Expatriate Tax Documentation', 'Dear Ms. Smith,\n\nFor your expatriate tax return, I need the following additional documents:\n1. Form 1040 from your home country\n2. Tax treaty documentation\n3. Proof of tax paid in your home country\n\nPlease provide these documents by the end of this week.\n\nBest regards,\nThomas Müller', false, '2024-01-21 09:15:00'),
(3, 4, 'admin', 'Corporate Tax Return Progress', 'Dear Mr. Johnson,\n\nYour corporate tax return is progressing well. I have completed the initial review and found everything to be in order.\n\nI will submit the return to the tax authorities by the end of next week.\n\nBest regards,\nMaria Schmidt', true, '2024-01-11 16:45:00'),
(4, 5, 'admin', 'Tax Return Completed', 'Dear Ms. Wilson,\n\nYour 2024 individual tax return has been completed and submitted to the tax authorities.\n\nYou will receive the confirmation letter within 2-3 weeks.\n\nBest regards,\nThomas Müller', true, '2024-01-06 11:20:00'),
(5, 6, 'admin', 'Document Request', 'Dear Mr. Brown,\n\nI need the following documents for your corporate tax return:\n1. Annual financial statements\n2. Board meeting minutes\n3. Shareholder resolutions\n\nPlease provide these documents as soon as possible.\n\nBest regards,\nAnna Weber', false, '2024-01-26 13:30:00'),
(6, 7, 'admin', 'Tax Return Review', 'Dear Ms. Davis,\n\nI have started reviewing your 2024 tax return. I noticed a few items that need clarification:\n1. Medical expenses deduction\n2. Charitable contributions\n\nPlease provide supporting documentation for these items.\n\nBest regards,\nMaria Schmidt', false, '2024-01-19 15:00:00'),
(7, 8, 'admin', 'Corporate Tax Return Filed', 'Dear Mr. Miller,\n\nYour corporate tax return has been successfully filed with the tax authorities.\n\nYou will receive the confirmation and any refund within 4-6 weeks.\n\nBest regards,\nThomas Müller', true, '2024-01-13 14:15:00'),
(8, 9, 'admin', 'Expatriate Tax Documentation', 'Dear Ms. Garcia,\n\nFor your expatriate tax return, I need the following documents:\n1. Form 1040 from your home country\n2. Tax treaty documentation\n3. Proof of tax paid in your home country\n\nPlease provide these documents by next Monday.\n\nBest regards,\nAnna Weber', false, '2024-01-23 10:30:00');

-- Step 6: Insert sample appointments
INSERT INTO appointments (client_id, title, description, appointment_date, duration_minutes, status, meeting_type, meeting_link, notes, created_at) VALUES
(1, 'Tax Return Consultation', 'Review of 2024 tax return documents and planning for 2025', '2024-01-25 10:00:00', 60, 'scheduled', 'phone', NULL, 'Client prefers morning appointments', '2024-01-15 09:00:00'),
(2, 'Expatriate Tax Planning', 'Discussion of expatriate tax obligations and optimization strategies', '2024-01-28 14:00:00', 90, 'scheduled', 'video', 'https://meet.taxed.ch/expat-consultation', 'Video call preferred for document sharing', '2024-01-20 14:15:00'),
(3, 'Corporate Tax Strategy', 'Annual corporate tax planning and optimization review', '2024-01-30 09:30:00', 120, 'scheduled', 'in_person', NULL, 'Meeting at client office in Lausanne', '2024-01-10 11:45:00'),
(4, 'Tax Return Review', 'Final review of completed 2024 tax return', '2024-01-22 15:00:00', 30, 'completed', 'phone', NULL, 'Tax return completed successfully', '2024-01-05 16:20:00'),
(5, 'Corporate Tax Documentation', 'Review of required corporate tax documents', '2024-02-01 11:00:00', 60, 'scheduled', 'video', 'https://meet.taxed.ch/corporate-docs', 'Document review session', '2024-01-25 13:10:00'),
(6, 'Tax Return Consultation', 'Review of 2024 tax return and planning for 2025', '2024-01-29 16:00:00', 60, 'scheduled', 'phone', NULL, 'Evening appointment as requested', '2024-01-18 15:30:00'),
(7, 'Corporate Tax Filing', 'Final review and filing of corporate tax return', '2024-01-20 10:00:00', 45, 'completed', 'in_person', NULL, 'Tax return filed successfully', '2024-01-12 12:00:00'),
(8, 'Expatriate Tax Consultation', 'Initial consultation for expatriate tax obligations', '2024-02-02 13:00:00', 90, 'scheduled', 'video', 'https://meet.taxed.ch/expat-initial', 'First-time expatriate client', '2024-01-22 10:45:00');

-- Step 7: Insert sample audit log entries
INSERT INTO audit_log (user_id, user_type, action, table_name, record_id, old_values, new_values, ip_address, user_agent, created_at) VALUES
(1, 'client', 'login', 'clients', 1, NULL, '{"last_login": "2024-01-15 09:00:00"}', '192.168.1.100', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', '2024-01-15 09:00:00'),
(2, 'client', 'login', 'clients', 2, NULL, '{"last_login": "2024-01-20 14:15:00"}', '192.168.1.101', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', '2024-01-20 14:15:00'),
(1, 'admin', 'login', 'admin_users', 1, NULL, '{"last_login": "2024-01-15 08:30:00"}', '192.168.1.200', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', '2024-01-15 08:30:00'),
(2, 'admin', 'login', 'admin_users', 2, NULL, '{"last_login": "2024-01-20 13:45:00"}', '192.168.1.201', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', '2024-01-20 13:45:00'),
(1, 'client', 'document_upload', 'documents', 1, NULL, '{"filename": "tax_return_2024_john_doe.pdf", "document_type": "tax_return"}', '192.168.1.100', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', '2024-01-15 09:30:00'),
(2, 'client', 'document_upload', 'documents', 4, NULL, '{"filename": "expat_form_2024.pdf", "document_type": "tax_return"}', '192.168.1.101', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', '2024-01-20 14:30:00'),
(1, 'admin', 'case_update', 'tax_cases', 1, '{"status": "pending"}', '{"status": "in_progress"}', '192.168.1.200', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', '2024-01-15 10:00:00'),
(2, 'admin', 'message_sent', 'messages', 1, NULL, '{"subject": "Tax Return Status Update", "sender_type": "admin"}', '192.168.1.201', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', '2024-01-16 10:00:00');

-- VERIFICATION QUERIES
-- Check record counts in each table
SELECT 'admin_users' as table_name, COUNT(*) as record_count FROM admin_users
UNION ALL
SELECT 'clients' as table_name, COUNT(*) as record_count FROM clients
UNION ALL
SELECT 'tax_cases' as table_name, COUNT(*) as record_count FROM tax_cases
UNION ALL
SELECT 'documents' as table_name, COUNT(*) as record_count FROM documents
UNION ALL
SELECT 'messages' as table_name, COUNT(*) as record_count FROM messages
UNION ALL
SELECT 'appointments' as table_name, COUNT(*) as record_count FROM appointments
UNION ALL
SELECT 'audit_log' as table_name, COUNT(*) as record_count FROM audit_log;
