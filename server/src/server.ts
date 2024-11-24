import express from 'express';
import { sequelize, User } from './models/index.js';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5432;

// Middleware
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Welcome to the Kanban Board API!');
});

// Sync database and start server
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    await sequelize.sync(); // Sync models with database
    console.log('Database synced.');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
