var express = require('express');
var router = express.Router();
var wiki = require('../wiki');
var parseNamu = require('../module-internal/namumark')
var wikiPageHandler = require('../module-internal/mysql')
var jsonfile = require('jsonfile');
var forwarded = require('forwarded-for');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/w/'+encodeURI(wiki.front))
});

//if no name supplied, redirect to main page
router.get('/w', function(req, res, next) {
	res.redirect('/w/'+encodeURI(wiki.front))
});
router.get('/edit', function(req, res, next) {
	res.redirect('/w/'+encodeURI(wiki.front))
});
router.get('/history', function(req, res, next) {
	res.redirect('/w/'+encodeURI(wiki.front))
});

router.get('/showall', function(req, res) {
	wikiPageHandler.getArticleList(function(pageList) {
		res.render('showall', { doc: pageList, pagetitle: "모든 문서 보기 :: " + wiki.name })
	});
});

//wiki page is saved instantly so there's no need to save
router.get('/save', function(req, res) {
	res.redirect('/w/'+encodeURI(wiki.front))
});

// go to article. if article not exist, show search page
router.get('/go/:page', function(req, res) {
	wikiPageHandler.gotoArticle(req.params.page, function(result,wikiPageList) {
		if(result == 200){
			res.redirect('/w/'+encodeURI(wikiPageList))
			res.end()
			return;
		} else if(result == 502){
		    res.status(result);
		    res.render('error', {
		      message: "DB서버 연결 실패",
		      error: {}
		    });
		} else {
			res.redirect('/search/'+encodeURI(req.params.page))
			res.end()
			return;
		}
	});
});

var searchFunc = function(req, res) {
	var name;
	if(typeof req.body.name != "undefined") name = req.body.name;
	else if(typeof req.params.page != "undefined") name = req.params.page;
	else name = "";
	wikiPageHandler.searchArticle(name, function(result,wikiPageList) {
		if(result == 502){
		    res.status(result);
		    res.render('error', {
		      message: "DB서버 연결 실패",
		      error: {}
		    });
		} else {
			res.status(result).render('search', { data: wikiPageList })
			res.end()
		}
	});
}

router.get('/search/:page', searchFunc);
router.post('/search', searchFunc);

router.get('/w/:page', function(req, res, next) {
	wikiPageHandler.getArticle(req.params.page, function(result,wikiPage) {
		if(result == 404){
			res.status(result).render('index', { pagetitle: req.params.page + "(없는 문서) :: " + wiki.name, title: req.params.page, content: result });
			res.end()
		} else if(result == 502){
			res.status(result).render('index', { pagetitle: "시스템 오류 :: " + wiki.name, title: req.params.page, content: "DB서버 연결 실패" });
			res.end()
		} else {
			parseNamu(wikiPage.content, function(cnt) {
				res.status(result).render('index', { pagetitle: wikiPage.title + " :: " + wiki.name, title: wikiPage.title, content: cnt });
				res.end()
			});
		}
	});
});
router.get('/raw/:page', function(req, res) {
	wikiPageHandler.getArticle(req.params.page, function(result,wikiPage) {
		if(result != 200){
			res.status(result).send("")
			res.end()
		} else {
			res.status(result).send(wikiPage.content)
		}
	});
	
});
router.get('/edit/:page', function(req, res) {
	wikiPageHandler.getArticle(req.params.page, function(result,wikiPage) {
		if(result != 200){
			res.render('edit', { pagetitle: req.params.page + " 문서 생성하기 :: " + wiki.name, title: req.params.page, content: "[[" + req.params.page + "]] 문서의 내용을 적으세요." });
			res.end()
		} else {
			if(wikiPage.canEdit) {
				res.render('edit', { pagetitle: req.params.page + " 문서 편집하기 :: " + wiki.name, title: req.params.page, content: wikiPage.content });
				res.end()
			} else {
				res.render('edit-readonly', { pagetitle: req.params.page + " 문서 원본 보기 :: " + wiki.name, title: req.params.page, content: wikiPage.content });
				res.end()
			}
		}
	});
});
router.post('/edit/:page', function(req, res) {
	var ip = forwarded(req, req.headers).ip;
	
	//@TODO add comment input
	//@TODO add success message
	wikiPageHandler.saveArticle(req.params.page, ip, req.body.content, "edit page " + req.params.page, function(result) {
		if(result.code != 200){
		    res.status(result.code);
		    res.render('error', {
		      message: result.message,
		      error: result.error
		    });
		} else {
			res.redirect('/w/'+encodeURI(req.params.page));
		}
	});
});

//일단 지정만 해둠
router.get('/move/:page', function(req, res) {
	res.status(403).render('index', { pagetitle: "미구현 기능 :: " + wiki.name, title: "Sorry!", content: "이동하기는 아직 구현되지 않은 기능입니다." });
	res.end()
});
router.post('/move/:page', function(req, res) {
	res.status(403).render('index', { pagetitle: "미구현 기능 :: " + wiki.name, title: "Sorry!", content: "이동하기는 아직 구현되지 않은 기능입니다." });
	res.end()
});
router.get('/delete/:page', function(req, res) {
	res.status(403).render('index', { pagetitle: "미구현 기능 :: " + wiki.name, title: "Sorry!", content: "삭제하기는 아직 구현되지 않은 기능입니다." });
	res.end()
});
router.post('/delete/:page', function(req, res) {
	res.status(403).render('index', { pagetitle: "미구현 기능 :: " + wiki.name, title: "Sorry!", content: "삭제하기는 아직 구현되지 않은 기능입니다." });
	res.end()
});
router.get('/acl/:page', function(req, res) {
	res.status(403).render('index', { pagetitle: "미구현 기능 :: " + wiki.name, title: "Sorry!", content: "ACL 수정은 아직 구현되지 않은 기능입니다." });
	res.end()
});
router.post('/acl/:page', function(req, res) {
	res.status(403).render('index', { pagetitle: "미구현 기능 :: " + wiki.name, title: "Sorry!", content: "ACL 수정은 아직 구현되지 않은 기능입니다." });
	res.end()
});

router.get('/history/:page', function(req, res) {
	wikiPageHandler.getArticleHistory(req.params.page, function(result,historyList) {
		res.render('history', { pagetitle: req.params.page + " 문서의 역사 :: " + wiki.name, title: req.params.page, history: historyList });
		res.end()
	});
});

// 특정 리비전 보기 페이지
router.get('/w/:page/:revision', function(req, res) {
	wikiPageHandler.getArticleRevision(req.params.page, req.params.revision, function(result,wikiPage) {
		if(result == 404){
			res.status(result).render('index', { pagetitle: req.params.page + "(없는 문서) :: " + wiki.name, title: req.params.page, content: result });
			res.end()
		} else if(result == 502){
			res.status(result).render('index', { pagetitle: "시스템 오류 :: " + wiki.name, title: req.params.page, content: "DB서버 연결 실패" });
			res.end()
		} else {
			parseNamu(wikiPage.content, function(cnt) {
				res.status(result).render('index', { pagetitle: wikiPage.title + "(버전 " + req.params.revision + ") :: " + wiki.name, title: wikiPage.title, content: cnt });
				res.end()
			});
		}
	});
});

router.get('/signin/:name', function(req, res) {
	res.status(403).render('index', { pagetitle: "지원 중단 :: " + wiki.name, title: "Sorry!", content: "해당 기능은 MySQL 포크에서는 지원 중단되었습니다." });
	res.end()
	/*
	var ip = forwarded(req, req.headers).ip;
	if(!req.params.name === "admin") {
		wiki.nick[ip] = req.params.name
	}
	res.redirect('/w/'+encodeURI(wiki.front))
	*/
})
router.get('/signout', function(req, res) {
	res.status(403).render('index', { pagetitle: "지원 중단 :: " + wiki.name, title: "Sorry!", content: "해당 기능은 MySQL 포크에서는 지원 중단되었습니다." });
	res.end()
	/*
	var ip = forwarded(req, req.headers).ip;
	wiki.nick[ip] = undefined
	res.redirect('/w/'+encodeURI(wiki.front))
	*/
})
process.on('exit', function(){
	//nothing to do yet
})

module.exports = router;
