import dotenv from 'dotenv';
import { app } from './app.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { db } from './db/index.js';
import { runMigrations } from './db/schema.js';
import { testDbConnection } from './db/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: join(__dirname , '/.env') });
}

async function initServer() {
  await testDbConnection();
  await runMigrations(); // Ensures tables exist in Aiven MySQL
  
  app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running at port: ', process.env.PORT);
  })
}

initServer()