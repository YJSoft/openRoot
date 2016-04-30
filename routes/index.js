var express = require('express');
var router = express.Router();
var wiki = require('../wiki')
var parseNamu = require('../module-internal/namumark')
var jsonfile = require('jsonfile');

// 대문으로 이동합니다.
router.get('/', function(req, res, next) {
  res.redirect('/w/'+wiki.front)
});
// 모든 문서를 보여줍니다.
router.get('/showall', function(req, res) {
  res.render('showall', { doc: wiki.doc })
});
// 지금까지의 변화를 wiki.json에 저장합니다.
router.get('/save', function(req, res) {
  jsonfile.writeFile('./wiki.json', wiki, {spaces: 2}, (err) => {
    if(err) throw err;
    console.log("Data saved.");
  })
  res.redirect('/w/'+wiki.front)
});
// 검색 결과를 보여줍니다.
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
// 항목을 보여줍니다.
router.get('/w/:page', function(req, res, next) {
  if(!wiki.doc[req.params.page] || !wiki.doc[req.params.page].content){
    res.status(404).render('index', { title: req.params.page, content: "404" });
    res.end()
    return;
  }
  parseNamu(wiki.doc[req.params.page].content, (cnt) => {
    res.status(200).render('index', { title: req.params.page, content: cnt });
    res.end()
  })
});
// 항목의 나무마크 문법까지 그대로 보여줍니다.
router.get('/raw/:page', function(req, res) {
  if(!wiki.doc[req.params.page] || !wiki.doc[req.params.page].content){
    res.status(404).send("No Content")
    res.end()
    return;
  }
  res.status(200).send(wiki.doc[req.params.page].content)
});
// 편집 화면을 보여줍니다.
router.get('/edit/:page', function(req, res) {
  if(!wiki.doc[req.params.page] || !wiki.doc[req.params.page].content){
    res.render('edit', { title: req.params.page, content: "뭔가를 해보세요." });
    res.end()
    return;
  }
  parseNamu(wiki.doc[req.params.page].content, (cnt) => {
    res.render('edit', { title: req.params.page, content: wiki.doc[req.params.page].content });
    res.end()
  })
});
// 편집 결과를 적용하고 해당 문서로 이동합니다.
router.post('/edit/:page', function(req, res) {
  if(req.body.title === "GOODBYE-CODE-DELETE-HERE") process.exit(0)
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
  if(!wiki.doc[req.body.title].canEdit) return;
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
    delete wiki.doc[req.params.title] // 문서 이동 기능
  }
  res.redirect('/w/'+encodeURI(req.body.title))
});
// 문서 역사를 보여줍니다.
router.get('/history/:page', function(req, res) {
  if(!wiki.doc[req.params.page].history){
    res.render('history', { title: req.params.page, history: ["아직 아무도 손대지 않은 문서입니다!"] });
    res.end()
    return;
  }
  res.render('history', { title: req.params.page, history: wiki.doc[req.params.page].history });
  res.end()
});
// nick에 아이피를 등록합니다.
router.get('/signin/:name', function(req, res) {
  var ip = ip ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
  if(!req.params.name === "admin") {
    wiki.nick[ip] = req.params.name
  }
  res.redirect('/w/'+wiki.front)
})
// 등록한 아이피를 삭제합니다.
router.get('/signout', function(req, res) {
  var ip = ip ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
  delete wiki.nick[ip] // 등록된 nick를 삭제합니다.
  res.redirect('/w/'+wiki.front)
})
process.on('exit', function(){
  jsonfile.writeFile('./wiki.json', wiki, {spaces: 2}, (err) => {
    if(err) throw err;
    console.log("Data saved.");
  })
})

module.exports = router;
