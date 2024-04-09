import express from 'express';
import { sendMessage } from '../Controllers/message.controller.js';
import  protectRoute from '../Middleware/protectRoute.js';
const router = express.Router();

router.post('/send/:id',protectRoute, sendMessage);

export default router; 