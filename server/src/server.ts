const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

app.use(express.json());
app.use(routes);

// Add detailed logging and error handling
async function initializeDatabase() {
  try {
    // Log connection details for debugging
    console.log('Database Config:', {
      host: sequelize.config.host,
      port: sequelize.config.port,
      username: sequelize.config.username,
      database: sequelize.config.database,
    });

    // Authenticate connection first
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Sync database
    await sequelize.sync({ force: forceDatabaseRefresh });
    console.log('Database synchronized.');

    // Start server after successful database connection
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize database:', error);
    // Optionally, exit the process if database connection fails
    process.exit(1);
  }
}

// Call the initialization function
initializeDatabase();