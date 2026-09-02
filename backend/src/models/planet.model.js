import { db } from "../db/index.js";

export const planetModel = {
    async findAll() {
        const query = `
            SELECT 
                BIN_TO_UUID(p.planet_id),
                p.name,
                p.description,
                p.about,
                p.img,
                p.created_at,
                ps.equatorial_radius,
                ps.orbital_period,
                ps.mass_density,
                ps.solar_aphelion
            FROM planets p
            LEFT JOIN planet_stats ps
            ON p.planet_id = ps.planet_id;
        `;
        const [rows] = await db.query(query);
        return rows;
    },
    
    async findById(planetId) {
        const query = `
            SELECT 
                BIN_TO_UUID(p.planet_id),
                p.name,
                p.description,
                p.about,
                p.img,
                p.created_at,
                ps.equatorial_radius,
                ps.orbital_period,
                ps.mass_density,
                ps.solar_aphelion
            FROM planets p
            LEFT JOIN planet_stats ps
            ON p.planet_id = ps.planet_id;
            WHERE p.planet_id = UUID_TO_BIN(?);
        `;
        const [rows] = await db.query(query,[planetId]);
        return rows;
    },

    async add(planetData){
        const connection = await db.getConnection();
        try{
            await connection.beginTransaction();
            const query1 = `
                INSERT INTO planets (planet_id, name, description, about, img, cloudinaryID) 
                VALUES (UUID_TO_BIN(?), ?, ?, ?, ?);
            `;
            const query2 = `
                INSERT INTO planet_stats (planet_id, equatorial_radius, orbital_period, mass_density, solar_aphelion)
                VALUES (UUID_TO_BIN(?), ?, ?, ?, ?)
            `
            await connection.query(query1,[
                planetData.planet_id,
                planetData.name,
                planetData.description,
                planetData.about,
                planetData.img,
                planetData.cloudinaryID
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
    },

    async edit(newPlanetData) {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            const query = `
                UPDATE planets p
                LEFT JOIN planet_stats ps ON p.planet_id = ps.planet_id
                SET 
                    p.name=?,
                    p.description=?, 
                    p.about=?, 
                    p.img=?, 
                    p.cloudinaryID=?
                    ps.equatorial_radius=?,
                    ps.orbital_period=?,
                    ps.mass_density=?,
                    ps.solar_aphelion=?
                WHERE p.planet_id=UUID_TO_BIN(?);
            `;
            await connection.query(query, [
                newPlanetData.name,
                newPlanetData.description,
                newPlanetData.about,
                newPlanetData.img,
                newPlanetData.cloudinaryID,
                newPlanetData.equatorial_radius,
                newPlanetData.orbital_period,
                newPlanetData.mass_density,
                newPlanetData.solar_aphelion,
                newPlanetData.planet_id
            ]);
            await connection.commit();
        } catch(error) {
            await connection.rollback(); 
            throw error;
        } finally {
            connection.release();
        }
    },

    async delete(planetId) {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            const query = `
                DELETE FROM planets WHERE planet_id = UUID_TO_BIN(?);
            `;
            await connection.query(query,[planetId]);
            await connection.commit();
        } catch(error) {
            await connection.rollback(); 
            throw error;
        } finally {
            connection.release(); 
        }
    }
}