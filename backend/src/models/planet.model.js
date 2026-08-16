import { db } from "../db";

export const planetModel = {
    async findAll() {
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
            const query1 = `
                INSERT INTO planets (planet_id, name, description, about, img) 
                VALUES (?, ?, ?, ?, ?);
            `;
            const query2 = `
                INSERT INTO planet_stats (planet_id, equatorial_radius, orbital_period, mass_density, solar_aphelion)
                VALUES (?, ?, ?, ?, ?)
            `
            await connection.query(query1,[
                planetData.planet_id,
                planetData.name,
                planetData.description,
                planetData.about,
                planetData.img
            ]);
            await connection.query(query2,[
                planetData.planet_id,
                planetData.equatorial_radius,
                planetData.orbital_period,
                planetData.mass_density,
                planetData.solar_aphelion
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