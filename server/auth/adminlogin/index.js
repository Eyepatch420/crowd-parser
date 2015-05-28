'use strict';

var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt-nodejs');
var db = require('../../database/database');
var jwt = require('jwt-simple');
var secret = require('./adminloginsecret');

router.post('/', function(req, res, next) {

  //db.db.query('USE production');
  db.db.query("SELECT * FROM admin WHERE username='" + req.body.username + "';", function(err, rows) {

    if (rows.length !== 0) {
      bcrypt.compare(req.body.password, rows[0].password, function(err, match) {
        if (match) {
          var token = jwt.encode(rows[0], secret.secret);
          res.send({token: token});
        } else {
          res.send('Password is incorrect');
        }
      });
    } else {
      res.send('Username is incorrect');
    }

  });
});

router.get('/getTables', function(req, res, next) {
  db.returnTablesWithColumns(function(tables) {
      res.send(tables);
  });

});

router.get('/getDatabaseName', function(req, res, next) {

    db.getCurrentDatabaseName(function(name){
      res.send(name);
    });
});

router.post('/showTableSize', function(req, res, next) {
  db.db.query('SELECT COUNT(*) FROM ' + req.body.name, function(err, response) {
    if (err) {
      console.log(err);
      res.send('error!');
    } else {
      console.log(response);
      res.send(response);
    }
  })
});

router.get('/showAllKeywords', function(req, res, next) {
  db.db.query('SELECT * FROM keywords;', function(err, rows) {
    console.log(err, rows);

    res.send(rows);
  });
});

router.get('/showAllLayers', function(req, res, next) {
  db.db.query('SELECT * FROM layers;', function(err, rows) {
    console.log(err, rows);

    res.send(rows);
  });
});

router.post('/selectTable', function(req, res, next) {
  var name = req.body.name;
  db.genericDescribeTable(name, function(err, rows) {
    if(err){
      console.log(err);
      res.send(null);
      return;
    }
      res.send(rows);
  });
});


router.post('/addNewKeyword', function(req, res, next) {
  var name = req.body.name;
  db.addNewKeyword(name, function(err, rows) {
    if(err){
      console.log(err);
      res.send(false);
      return;
    }
      res.send(true);
  });
});

router.post('/redoKeyword', function(req, res, next) {
  var name = req.body.name;
  db.redoKeyword(name, function(err, rows) {
    if(err){
      console.log(err);
      res.send(false);
      return;
    }
      res.send(true);
  });
});

router.post('/deleteKeyword', function(req, res, next) {
  var name = req.body.name;
  db.deleteKeyword(name, function(err, rows) {
    if(err){
      console.log(err);
      res.send(false);
      return;
    }
      res.send(true);
  });
});

router.post('/addNewLayer', function(req, res, next) {
  var name = req.body.name;
  db.addNewLayer(name, function(err, rows) {
    if(err){
      console.log(err);
      res.send(false);
      return;
    }
      res.send(true);
  });
});

router.post('/redoLayer', function(req, res, next) {
  var name = req.body.name;
  db.redoLayer(name, function(err, rows) {
    if(err){
      console.log(err);
      res.send(false);
      return;
    }
      res.send(true);
  });
});

router.post('/deleteLayer', function(req, res, next) {
  var name = req.body.name;
  db.deleteLayer(name, function(err, rows) {
    if(err){
      console.log(err);
      res.send(false);
      return;
    }
      res.send(true);
  });
});

router.post('/createDatabase', function(req, res, next) {
  var name = req.body.name;
  db.createDatabase(name, function(err, rows) {
    if(err){
      console.log(err);
      res.send(false);
      return;
    }
      res.send(true);
  });
});

router.post('/changeToDatabase', function(req, res, next) {
  var name = req.body.name;
  db.changeToDatabase(name, function(err, rows) {
    if(err){
      console.log(err);
      res.send(false);
      return;
    }
      res.send(true);
  });
});

router.post('/deleteDatabase', function(req, res, next) {
  var name = req.body.name;
  db.deleteDatabase(name, function(err, rows) {
    if(err){
      console.log(err);
      res.send(false);
      return;
    }
      res.send(true);
  });
});

router.post('/ADDALLTHETWEETS', function(req, res, next) {
  // res.setTimeout(0, function(){
  //   console.log("hit timeout");
  // });
//this test only fires the callback on the first tweet
  db.ADDTHEFIVETESTTWEETS(function(err, container) {
    if(err){
      console.log(err);
      res.send(false);
      return;
    }
      //container is {tweet: obj, layers:[obj,obj]}
      res.send(container);
  });
});

router.post('/ADDTHEFIVETESTTWEETS', function(req, res, next) {
  // res.setTimeout(0, function(){
  //   console.log("hit timeout");
  // });
//this test only fires the callback on the first tweet
  db.ADDTHEFIVETESTTWEETS(function(err, container) {
    if(err){
      console.log(err);
      res.send(false);
      return;
    }
      //container is {tweet: obj, layers:[obj,obj]}
      res.send(container);
  });
});


module.exports = router;
