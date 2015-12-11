var express    = require('express')
  , bodyParser = require('body-parser')
  , request    = require('request')
  , _ = require('lodash')
  , Q = require('q');

var app        = express();
var apicache   = require('apicache').options({ debug: true }).middleware;

app.use(require('compression')());        // gzip
app.use(require('./scripts/whitelist'));  // whitelist certain domains

app.get("/name", /*apicache('2 minutes'),*/ function(req, res, next){
  //...
  Q.all([adjective(), noun()]).then(function(results){
    var name = results[0] + '-' + results[1];
    res.send(name);
  })
})

app.use(function(req, res, next){ res.sendfile('./public/index.html'); })

var port = process.env.PORT || 3000;
app.listen(port);

console.log("listening on port " + port);

function noun() {
  var words = [
    "ecdysis",
    "elaphus",
    "ex-girlfriends",
    "fantasmagoria",
    "flavourings",
    "microgel",
    "milk-pan",
    "pantiles",
    "songwriters",
    "valew"
  ]

  return Q.resolve(_.sample(words));
}

function adjective() {
  var words = [
    "Geminian",
    "brighter",
    "careerlong",
    "cattish",
    "coulomb",
    "exportable",
    "moanful",
    "nestling",
    "uncommercialised",
    "unthreatening"
  ]

  return Q.resolve(_.sample(words));
}
