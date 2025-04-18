-- Ajouter les colonnes pour la fonctionnalité de réinitialisation de mot de passe
ALTER TABLE users 
ADD COLUMN reset_token VARCHAR(255),
ADD COLUMN reset_token_expiry DATETIME;
