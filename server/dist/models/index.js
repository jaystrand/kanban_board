import dotenv from 'dotenv';
dotenv.config(); // Ensure this is at the top
import { Sequelize } from 'sequelize';
import { UserFactory } from './user'; // Import the factory function for User
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '[REDACTED]' : 'UNDEFINED');
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_HOST:', process.env.DB_HOST);
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: String(process.env.DB_USER).trim(),
    password: String(process.env.DB_PASSWORD).trim(),
    database: process.env.DB_NAME || 'default_db_name',
    logging: console.log,
    dialectOptions: {
        ssl: false,
    },
});
// Initialize the User model
const User = UserFactory(sequelize);
// Export both sequelize and User
export { sequelize, User };
