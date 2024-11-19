import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
    console.log('Login request received');
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY || 'your-secret-key', { expiresIn: '24h' });
        return res.json({ token });
    }
    catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};
const router = Router();
router.post('/login', login);
export default router;
