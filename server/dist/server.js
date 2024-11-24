var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { sequelize } from './models/index.js';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables
const app = express();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(express.json());
// Example route
app.get('/', (req, res) => {
    res.send('Welcome to the Kanban Board API!');
});
// Sync database and start server
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log('Database connected successfully.');
        yield sequelize.sync(); // Sync models with database
        console.log('Database synced.');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}))();
