import { db } from "../db/index.js";

export const bookingModel = {
    async findAll() {
        const query = `
            SELECT * FROM booking;
        `;
        const [rows] = await db.query(query);
        return rows;
    },

    async findById(bookingId) {
        const query = `
        SELECT * FROM booking
        WHERE booking_id=?
        `;
        const [rows] = await db.query(query,[bookingId]);
        return rows;
    },
    
    async edit(newBookingData) {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            const query = `
                UPDATE booking SET status=?
                WHERE booking_id=?;
            `;
            await connection.query(query, [
                newBookingData.status,
                newBookingData.booking_id
            ]);
            await connection.commit();
        } catch(error) {
            await connection.rollback(); 
            throw error;
        } finally {
            connection.release();
        }
    },

    async add(bookingData) {
        const connection = await db.getConnection()
        try {
            await connection.beginTransaction();
            const query = `
                INSTER INTO booking (user_id, planet_id, status, space_id, ticket_id, departure_station, created_at)
                VALUES (?,UUID_TO_BIN(?),?,?,?,?,?);
            `;
            await connection.query(query, [
                bookingData.user_id,
                bookingData.planet_id,
                bookingData.status,
                bookingData.space_id,
                bookingData.ticket_id,
                bookingData.departure_station
            ]);
            await connection.commit();
        } catch(error) {
            await connection.rollback(); 
            throw error;
        } finally {
            connection.release();
        }
    },

    async findByUserId(userId) {
        const query = `
            SELECT  
                b.status,
                b.space_id,
                b.ticket_id,
                b.departure_station,
                b.created_at,
                u.name AS user_name,
                u.email,
                p.name planet_name
            FROM booking b
            JOIN users u ON b.user_id = u.user_id
            JOIN planets p ON b.planet_id = p.planet_id
            WHERE b.user_id=?;
        `;
        const [rows] = await db.query(query,[userId]);
        return rows;
    },
}