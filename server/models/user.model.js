import pool from '../db/db.pool.js'

const createUser = (name, email, password) => {
  return pool.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
};

const getUserByEmail = (email) => {
  return pool.execute('SELECT * FROM users WHERE email = ?', [email]);
};

const getUserById = (id) => {
  return pool.execute('SELECT * FROM users WHERE id = ?', [id]);
};

const userModel = {
  createUser,
  getUserByEmail,
  getUserById
};

export default userModel