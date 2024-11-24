import { Router } from 'express';
import authRoutes from './routes/auth-routes.js';
import apiRoutes from './routes/api/index.js';
import { authenticateToken } from './middleware/auth.js';


const router = Router();

router.use('/auth', authRoutes);
// Add authentication middleware to protect API routes
router.use('/api', authenticateToken, apiRoutes);

export default router;
