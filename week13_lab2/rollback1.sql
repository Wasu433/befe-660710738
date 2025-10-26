-- Rollback for migration1.sql
-- This will undo all changes made by migration1.sql

-- Drop indexes first (if any)
DROP INDEX IF EXISTS idx_users_active;
DROP INDEX IF EXISTS idx_users_email;
DROP INDEX IF EXISTS idx_users_username;

-- Drop dependent tables first (foreign key dependencies)
DROP TABLE IF EXISTS 
    audit_logs,
    refresh_tokens,
    user_roles,
    role_permissions,
    permissions,
    roles
CASCADE;

-- Drop users table (this will also delete all user data)
DROP TABLE IF EXISTS users CASCADE;
