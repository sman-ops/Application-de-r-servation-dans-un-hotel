import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// router.get('/checkauthentification', verifyToken, (req, res, next) => {
//   res.send('hello user, you are loggedin');
// });

// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//   res.send('hello user, you are loggedin adn you can delete your account');
// });

// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//   res.send('hello admin, you are loggedin adn you can delete  all account');
// });
// UPDATE

router.put('/:id', verifyUser, updateUser);

//DELETE

router.delete('/:id', deleteUser);

//GET

router.get('/:id', verifyUser, getUser);

//GET ALL
router.get('/', getUsers);
export default router;
