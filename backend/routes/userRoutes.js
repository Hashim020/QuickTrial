import express from 'express';
const router = express.Router();
import { signup, login ,updateSubscription} from '../controllers/userController.js';
import {protect} from '../middleware/authMiddleware.js';
import { googleRegister } from '../controllers/userController.js';
router.post('/signup', signup);
router.post('/google-auth', googleRegister);
router.post('/login', login);
router.post('/start-trial',protect,updateSubscription)
export default router;
