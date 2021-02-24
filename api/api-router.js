const router = require('express').Router();
const authRouter = require('../auth/auth-router.js');
const userRouter = require('../users/user-router.js');

router.use('/', authRouter);
router.use('/users', userRouter);

router.get('/', (req, res) => {
  res.send("Go-Go-Gadget Server!");
});

module.exports = router;