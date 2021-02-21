var express = require('express');
var router = express.Router();
const roomsRouter = require('./rooms');
const customersRouter = require('./customers');
const usersRouter = require('./routes/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/rooms', roomsRouter);
router.use('/customers', customersRouter);
router.use('/users', usersRouter);

module.exports = router;
