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
import authRoutes from './routes/auth-routes.js';
import apiRoutes from './routes/api/index.js';
import { authenticateToken } from './middleware/auth.js';
dotenv.config(); // Load environment variables
const app = express();
const PORT = process.env.PORT || 5432;
// Middleware
app.use(express.json());
// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));
app.use('/auth', authRoutes);
// Add authentication middleware to protect API routes
app.use('/api', authenticateToken, apiRoutes);
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
