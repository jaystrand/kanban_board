import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js'; // Note the `.js` extension for ESM
import dotenv from 'dotenv';
dotenv.config();
// Add this before your Sequelize configuration
console.log('Environment Variables:', {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    PASSWORD_SET: process.env.DB_PASSWORD ? 'Yes' : 'No' // Don't log the actual password
});
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER || 'postgres',
    password: String(process.env.DB_PASSWORD || ''), // Explicitly convert to string
    database: process.env.DB_NAME || 'kanban_db',
    logging: console.log,
    dialectOptions: {
        ssl: false, // Change to `true` if using SSL
    },
});
// Initialize the User model
const User = UserFactory(sequelize);
export { sequelize, User }; // Use `export` for ES Modules
