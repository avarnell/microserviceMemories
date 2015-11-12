var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = process.env.DBPATHDev;

router.post('/api/v1/memories', function(req,res,next){
    pg.connect(conString, function(err, client, done){
      client.query('INSERT INTO memories(old_days, these_days, year) VALUES($1, $2, $3) returning id',[req.body.data.attributes.old_days, req.body.data.attributes.these_days, req.body.data.attributes.year], function(err, result){
      done()
      res.send('Memory Created')
    })
  })
})

router.get('/api/v1/memories', function(req,res,next){
  pg.connect(conString, function(err,client,done){
    client.query('SELECT * from memories', function(err, result){
      done()

      var results = { "links": {},
        "data": [] }

      result.rows.forEach(function(row){
        var memory = {
          "type": "memory",
          "id": row.id,
          "attributes": {
            "old_days": row.old_days,
            "these_days": row.these_days,
            "year": row.year
          },
          "links": {}
        }
        results.data.push(memory)
      })
      res.json(results)
    })
  })
})

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
