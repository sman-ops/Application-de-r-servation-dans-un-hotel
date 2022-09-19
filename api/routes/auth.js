import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('hello , this  an auth endpoint');
});
router.get('/register', (req, res) => {
  res.send('hell    o , this  an auth register endpoint');
});

export default router;
