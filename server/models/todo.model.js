import pool from '../db/db.pool.js';

const createTodo = (userId, title, description) => {
  return pool.execute(
    'INSERT INTO todos (user_id, title, description) VALUES (?, ?, ?)', 
    [userId, title, description]
  );
};

const getTodosByUserId = (userId) => {
  return pool.execute('SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC', [userId]);
};

const getTodoById = (id) => {
  return pool.execute('SELECT * FROM todos WHERE id = ?', [id]);
};

const updateTodo = (id, title, description) => {
  return pool.execute(
    'UPDATE todos SET title = ?, description = ? WHERE id = ?', 
    [title, description, id]
  );
};

const deleteTodo = (id) => {
  return pool.execute('DELETE FROM todos WHERE id = ?', [id]);
};

const todoModel = {
  createTodo,
  getTodosByUserId,
  getTodoById,
  updateTodo,
  deleteTodo
};

export default todoModel;
