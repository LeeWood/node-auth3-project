const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets =require('./secrets.js');
const Users = require('../users/user-model.js');

function restricted(req, res, next) {

  const token = req.headers.authorization;

  if(req.decodedJwt) {
    next();
  }else if(token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedJwt) => {
      if(err) {
        res.status(401).json({ message: "You shall not pass!" });
      }else {
        req.decodedJwt = decodedJwt;
        next();
      }
    })
  }else {
    res.status(401).json({ message: "Sorry, you're not authorized..."});
  }
};

function checkDept(dept) {
  return function(req, res, next) {
    if(req.decodedJwt.department && req.decodedJwt.department.includes(dept)) {
      next();
    }else {
      res.status(403).json({ message: "You don't have access to this information."});
    }
  }
}

module.exports = {
  checkDept,
  restricted
}