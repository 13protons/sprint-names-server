var _ = require('lodash')
module.exports = function(req, res, next){
  var whitelist = [
    'localhost:4000',
    'localhost:3000',
    'localhost:8080'
  ]

  var host = req.get('origin') || req.get('host');
  if (_.includes(whitelist, host)) {
    res.setHeader('Access-Control-Allow-Origin', host);
  }

  next();
}
