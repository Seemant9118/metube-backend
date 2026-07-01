import { Router } from 'express';
import { registerUser } from './user.controller.js';

const router = Router();

router.route('/register').post(registerUser); // endpoint : http://localhost:5000/api/v1/users/register

export default router;