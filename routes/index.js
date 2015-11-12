var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://@localhost/memories";

/* GET home page. */

router.post('/memories', function(req,res,next){
    pg.connect(conString, function(err, client, done){
    client.query('INSERT INTO memories(old_days, these_days, year) VALUES($1, $2, $3) returning id',[req.body.old_days, req.body.these_days, req.body_year], function(err, result){
      done()
      res.send('Memory Created')
    })
  })
})


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
