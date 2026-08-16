import { db } from "../db";

export const bookingModel = {
    async findAll() {
        const query = `
            SELECT * FROM booking;
        `;
        const [rows] = await db.query(query);
        return rows;
    },
}