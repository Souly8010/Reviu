const db = require('../config/database');

class User {
  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }

  static create({ email, password, pseudo, google_business_email, phone_number }) {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO users (email, password, pseudo, google_business_email, phone_number) VALUES (?, ?, ?, ?, ?)',
        [email, password, pseudo, google_business_email, phone_number],
        (err, result) => {
          if (err) return reject(err);
          
          db.query('SELECT * FROM users WHERE id = ?', [result.insertId], (err, user) => {
            if (err) return reject(err);
            resolve(user[0]);
          });
        }
      );
    });
  }

  static saveResetToken(email, token, expiry) {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?',
        [token, expiry, email],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.affectedRows > 0);
        }
      );
    });
  }

  static findByResetToken(token) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()',
        [token],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static updatePassword(userId, password) {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?',
        [password, userId],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.affectedRows > 0);
        }
      );
    });
  }
}

module.exports = User;
