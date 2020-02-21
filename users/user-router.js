const router = require('express').Router();

const Users = require('./user-model.js');
const midWare = require('../auth/auth-middleware.js')

router.get('/', midWare.restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

// router.get('/my-dept', midWare.restricted, midWare.checkDept(), (req, res) => {
//   Users.find()
//     .then(users => {
//       res.json(users);
//     })
//     .catch(err => res.send(err));
// });

module.exports = router;