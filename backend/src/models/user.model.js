import { db } from "../db/index.js";

export const usersModel = {
    async find() {
        const query = `
            SELECT * FROM users;
        `;
        const [rows] = await db.query(query);
        return rows;
    },
    async findByID(user_id) {
        const query = `
            SELECT * FROM users 
            WHERE user_id = ?;
        `
        const [rows] = await db.query(query, [user_id]); 
        return rows || null;
    },
    async add(user_data){
        const connection = await db.getConnection();
        try{
            await connection.beginTransaction();
            const query = `
                INSERT INTO users (user_id, name, email, created_at, last_sign_in_at, role) 
                VALUES (?, ?, ?, ?, ?, ?);
            `;
            await connection.query(query,[
                user_data.supabase_id,
                user_data.name,
                user_data.email,
                user_data.created_at,
                user_data.last_sign_in_at,
                user_data.role
            ]);
            await connection.commit();

        } catch (error) {
            await connection.rollback(); 
            throw error;
        } finally {
            connection.release(); 
        }
    },
};