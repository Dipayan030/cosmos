import { db } from "./index.js";

const createTablesSQL = `
-- 1. USERS TABLE 
CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP,
    last_sign_in_at TIMESTAMP
) ENGINE=InnoDB;

-- 2. PLANETS TABLE
CREATE TABLE IF NOT EXISTS planets (
    planet_id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    about TEXT,
    img TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. PLANET STATS TABLE
CREATE TABLE IF NOT EXISTS planet_stats (
    planet_id VARCHAR(36) PRIMARY KEY,
    equatorial_radius VARCHAR(50),
    orbital_period VARCHAR(50),
    mass_density VARCHAR(50),
    solar_aphelion VARCHAR(50),
    CONSTRAINT fk_planet_stats_planet
        FOREIGN KEY (planet_id) REFERENCES planets(planet_id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. BOOKING TABLE
CREATE TABLE IF NOT EXISTS booking (
    booking_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    planet_id VARCHAR(36) NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    space_id VARCHAR(100) NOT NULL,
    ticket_id VARCHAR(100) NOT NULL UNIQUE,
    departure_station ENUM(
        'Astraea Orbital Gateway',
        'Nova Terra Spacedock',
        'Chronos Hyperport',
        'Helios Prime Launchpad'
    ) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_booking_planet
        FOREIGN KEY (planet_id) REFERENCES planets(planet_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_booking_user
        FOREIGN KEY (user_id) REFERENCES users(supabase_user_id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. INDEXES
-- CREATE INDEX IF NOT EXISTS idx_booking_user_id ON booking(user_id);
-- CREATE INDEX IF NOT EXISTS idx_booking_planet_id ON booking(planet_id);
-- CREATE INDEX IF NOT EXISTS idx_users_supabase_id ON users(supabase_user_id);
`;

export async function runMigrations() {
  try {
    // Enable multiple statements for this batch run
    const connection = await db.getConnection();
    
    // Split statements or execute sequentially
    const queries = createTablesSQL
      .split(';')
      .map(q => q.trim())
      .filter(q => q.length > 0);

    for (const query of queries) {
      await connection.query(query);
    }

    connection.release();
    console.log('⚡ MySQL Database Schemas initialized successfully!');
  } catch (error) {
    console.error('❌ Failed to run database schemas:', error.message);
  }
}
