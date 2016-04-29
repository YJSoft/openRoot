var express = require('express');
var wiki = require('../wiki');
var router = express.Router();
var forwarded = require('forwarded-for');

/* GET users listing. */
router.get('/:name', function(req, res, next) {
  getUser(req, (name) => userInfo(name, (info) => {
    res.render('user', {
      lastEdit: info.lastEdit,
      title: name
    })
  }))
});
function getUser(req, cb) {
  var ip = forwarded(req, req.headers).ip;
  if(wiki.nick[ip]) cb(wiki.nick[ip])
  else cb(ip)
}
function userInfo(name, cb) {
  if(wiki.user[name]) {
    cb(wiki.user[name])
  } else {
    wiki.user[name] = {
      "lastEdit": "알 수 없음"
    }
  }
  cb(wiki.user[name])
}

module.exports = router;
