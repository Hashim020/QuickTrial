import express from 'express';
const router = express.Router();
import { signup, login } from '../controllers/userController.js';
import {protect} from '../middleware/authMiddleware.js';

router.post('/signup', signup);
router.post('/login', login);
router.get('/trail',protect)
export default router;
