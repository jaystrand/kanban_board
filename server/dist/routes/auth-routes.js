var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Login request received');
    const { username, password } = req.body;
    try {
        const user = yield User.findOne({ where: { username: username } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const validPassword = yield bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY || 'your-secret-key', { expiresIn: '24h' });
        return res.json({ token });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});
const router = Router();
router.post('/login', login);
export default router;
