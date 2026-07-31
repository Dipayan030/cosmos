import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host: process.env.AIVEN_MYSQL_HOST,
    port: Number(process.env.AIVEN_MYSQL_PORT),
    user: process.env.AIVEN_MYSQL_USER,
    password: process.env.AIVEN_MYSQL_PASSWORD,
    database: process.env.AIVEN_MYSQL_DATABASE,
    ssl: {
        // Required by Aiven for secure SSL connections
        rejectUnauthorized: false,
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

export async function testDbConnection() {
  try {
    const client = await db.getConnection();
    console.log('Successfully connected to Aiven MySQL!');
    client.release(); // Release the client back to the pool
  } catch (err) {
    console.error('Failed to connect to Aiven DB on startup:', err);
  }
}