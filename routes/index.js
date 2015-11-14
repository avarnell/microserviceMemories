var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = process.env.DATABASE_URL;
var servicefxns = require('../servicefxns.js')

router.post('/api/v1/memories', function(req,res,next){
    pg.connect(conString, function(err, client, done){
      client.query('INSERT INTO memories(old_days, these_days, year) VALUES($1, $2, $3) returning id;', [req.body.data.attributes.old_days, req.body.data.attributes.these_days, req.body.data.attributes.year], function(err, result){
      done()
      res.json(result.rows)
    })
  })
})

router.get('/api/v1/memories', function(req,res,next){
  pg.connect(conString, function(err,client,done){
    client.query('SELECT * from memories', function(err, result){
      done()
      var results = servicefxns.getAll(result)
      res.json(results)
    })
  })
})

//select distinct memories.year as year from memories
router.get('/api/v1/memories/years', function(req,res,next){
  pg.connect(conString, function(err,client,done){
    client.query('select distinct memories.year as year from memories', function(err,result){
      var results = servicefxns.getYears(result)
      res.json(results)
    })
  })
})

router.get('/api/v1/memories/:year', function(req,res,next){
  var searchYear = req.params.year
  pg.connect(conString, function(err,client,done){
    client.query('SELECT * FROM memories WHERE year = $1', [searchYear], function(err, result){
      var results = servicefxns.getByYear(result)
      res.json(results)
    })
  })
})

module.exports = router;
