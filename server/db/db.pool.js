import mysql from 'mysql2'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'todos_app_db'
})

const promisePool = pool.promise();
export default promisePool