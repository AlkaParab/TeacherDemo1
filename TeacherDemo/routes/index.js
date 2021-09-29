var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',function(req, res, next) {
  res.send({ title: 'Express' });
});

router.post('/add',function(req, res, next) {
  res.send({ title: 'Express' });
});

router.put('/update',function(req, res, next) {
  res.send({ title: 'Express' });
});

router.delete('/delete',function(req, res, next) {
  res.send({ title: 'Express' });
});

router.post('/create',function(req, res, next) {
  res.send({ title: 'Express' });
});

module.exports = router;
