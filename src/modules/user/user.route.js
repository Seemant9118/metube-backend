import { Router } from 'express';
import { registerUser } from './user.controller.js';
import { upload } from '../../utils/multer.js';

const router = Router();

router.route('/register').post(
    upload.fields([
        {name: 'avatar', maxCount: 1},
        {name: 'coverImage', maxCount: 1}
    ]), // middleware to handle file uploads
    registerUser
); // endpoint : http://localhost:5000/api/v1/users/register

export default router;