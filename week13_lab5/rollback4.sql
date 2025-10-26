-- Rollback for migration4.sql
-- ลบตารางตามลำดับที่ถูกต้อง (ลบตารางที่มี foreign key ก่อน)

-- ลบ audit_logs (มี foreign key ไปยัง users)
DROP TABLE IF EXISTS audit_logs;

-- ลบ refresh_tokens (มี foreign key ไปยัง users)
DROP TABLE IF EXISTS refresh_tokens;

-- ลบ indexes (ถ้ายังมีอยู่)
DROP INDEX IF EXISTS idx_refresh_tokens_user;
DROP INDEX IF EXISTS idx_refresh_tokens_token;
DROP INDEX IF EXISTS idx_refresh_tokens_expires;
DROP INDEX IF EXISTS idx_audit_logs_user;
DROP INDEX IF EXISTS idx_audit_logs_action;
DROP INDEX IF EXISTS idx_audit_logs_created;