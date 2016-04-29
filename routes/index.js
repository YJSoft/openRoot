var express = require('express');
var router = express.Router();
var wiki = require('../wiki')
var parseNamu = require('../module-internal/namumark')
var jsonfile = require('jsonfile');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/w/'+encodeURI(wiki.front))
});
router.get('/showall', function(req, res) {
  res.render('showall', { doc: wiki.doc })
});
router.get('/save', function(req, res) {
  jsonfile.writeFile('./wiki.json', wiki, {spaces: 2}, (err) => {
    if(err) throw err;
    console.log("Data saved.");
  })
  res.redirect('/w/'+encodeURI(wiki.front))
});
router.post('/search', function(req, res) {
  if(wiki.doc[req.body.name]){
    res.redirect('/w/'+encodeURI(req.body.name))
    return;
  }
  var dta = []
  for(var property in wiki.doc){
    if(property.includes(req.body.name) || (wiki.doc[property] && wiki.doc[property].content.includes(req.body.name))){
      dta.push(property)
    }
  }
  res.render('search', { data: dta })
});
router.get('/w/:page', function(req, res, next) {
  if(!wiki.doc[req.params.page] || !wiki.doc[req.params.page].content){
    res.status(404).render('index', { pagetitle: req.params.page + "(없는 문서) :: " + wiki.name, title: req.params.page, content: "404" });
    res.end()
    return;
  }
  parseNamu(wiki.doc[req.params.page].content, (cnt) => {
    res.status(200).render('index', { pagetitle: req.params.page + " :: " + wiki.name, title: req.params.page, content: cnt });
    res.end()
  })
});
router.get('/raw/:page', function(req, res) {
  if(!wiki.doc[req.params.page] || !wiki.doc[req.params.page].content){
    res.status(404).send("")
    res.end()
    return;
  }
  res.status(200).send(wiki.doc[req.params.page].content)
});
router.get('/edit/:page', function(req, res) {
  if(!wiki.doc[req.params.page] || !wiki.doc[req.params.page].content){
    res.render('edit', { pagetitle: req.params.page + " 문서 생성하기 :: " + wiki.name, title: req.params.page, content: "[[" + req.params.page + "]] 문서의 내용을 적으세요." });
    res.end()
    return;
  }
  
  if(wiki.doc[req.params.page].canEdit) {
	  parseNamu(wiki.doc[req.params.page].content, (cnt) => {
	    res.render('edit', { pagetitle: req.params.page + " 문서 편집하기 :: " + wiki.name, title: req.params.page, content: wiki.doc[req.params.page].content });
	    res.end()
	  })
  } else {
	  parseNamu(wiki.doc[req.params.page].content, (cnt) => {
	    res.render('edit-readonly', { pagetitle: req.params.page + " 문서 원본 보기 :: " + wiki.name, title: req.params.page, content: wiki.doc[req.params.page].content });
	    res.end()
	  })
  }
});
router.post('/edit/:page', function(req, res) {
  //if(req.body.title === "GOODBYE-CODE-DELETE-HERE") process.exit(0)
  var ip = ip ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
  if(!wiki.doc[req.body.title]){
    wiki.doc[req.body.title] = {
      canEdit: true,
      history: [],
      content: ''
    }
  }
  const bytlenz = Buffer.byteLength(wiki.doc[req.body.title], 'utf8')+Buffer.byteLength(req.body.content, 'utf8')
  const bytlen = " ("+bytlenz+")"
  if(!wiki.doc[req.body.title].canEdit) {
	  res.redirect('/w/'+encodeURI(req.params.page));
	  return;
  }
  if(wiki.nick[ip]){
    wiki.doc[req.body.title].history.push(
      wiki.nick[ip]+bytlen
    )
  }else{
    wiki.doc[req.body.title].history.push(ip+bytlen)
  }
  if(!wiki.user[wiki.nick[ip] || ip]){
    wiki.user[wiki.nick[ip] || ip] = {
      "lastEdit": ""
    }
  }
  wiki.user[wiki.nick[ip] || ip].lastEdit = req.body.title

  wiki.doc[req.body.title].content = req.body.content
  if(wiki.doc[req.body.title] !== wiki.doc[req.params.title]){
    wiki.doc[req.params.title] = null // 문서 이동 기능
  }
  res.redirect('/w/'+encodeURI(req.params.page))
});
router.get('/history/:page', function(req, res) {
  if(!wiki.doc[req.params.page].history){
    res.render('history', { pagetitle: req.params.page + " 문서의 역사 :: " + wiki.name, title: req.params.page, history: ["문서 역사가 없습니다."] });
    res.end()
    return;
  }
  res.render('history', { pagetitle: req.params.page + " 문서의 역사 :: " + wiki.name, title: req.params.page, history: wiki.doc[req.params.page].history });
  res.end()
});
router.get('/signin/:name', function(req, res) {
  var ip = ip ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
  if(!req.params.name === "admin") {
    wiki.nick[ip] = req.params.name
  }
  res.redirect('/w/'+encodeURI(wiki.front))
})
router.get('/signout', function(req, res) {
  var ip = ip ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
  wiki.nick[ip] = undefined
  res.redirect('/w/'+encodeURI(wiki.front))
})
process.on('exit', function(){
  jsonfile.writeFile('./wiki.json', wiki, {spaces: 2}, (err) => {
    if(err) throw err;
    console.log("Data saved.");
  })
})

module.exports = router;
