const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('./secrets.js');
const Users = require('../users/user-model.js');

function genToken(user) {

  const payload = {
    userId: user.id,
    username: user.id,
    department: user.department
  };
  
  const options = {
    expiresIn: '1h'
  };

  const token = jwt.sign(payload, secrets.jwtSecret, options);

  return token;
}

router.post('/register', (req, res) => {

  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json({
        message: "error adding new user",
        error: err
      });
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);

        res.status(200).json({
          message: `Good to see you again, ${user.username}!`,
          token: token
        });
      }else {
        res.status(401).json({ message: "Invalid credentials..."});
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


module.exports = router;