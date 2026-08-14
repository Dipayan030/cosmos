import { db } from "../db";

export const planetModel = {
    async find() {
        const query = `
            SELECT * FROM planets;
        `;
        const [rows] = await db.query(query);
        return rows;
    },

    async add(planetData){
        const connection = await db.getConnection();
        try{
            await connection.beginTransaction();
            const query = `
                INSERT INTO planets (planet_id, name, description, about, img) 
                VALUES (?, ?, ?, ?, ?);
            `;
            await connection.query(query,[
                planetData.planet_id,
                planetData.name,
                planetData.description,
                planetData.about,
                planetData.img
            ]);
            await connection.commit();

        } catch (error) {
            await connection.rollback(); 
            throw error;
        } finally {
            connection.release(); 
        }
    }
}