// @author YJSoft(yjsoft@yjsoft.pe.kr)

var wiki = require('../wiki');
var mysql = require('mysql');
var btoa = require('btoa');

var pool = mysql.createPool({
	connectionLimit : 10,
	host     : wiki.dbhost,
	user     : wiki.dbuser,
	password : wiki.dbpassword,
	database : wiki.dbname
});

exports.getArticle = function(name,callback) {
	var wikiPage = new Object();
	
	pool.getConnection(function(err, connection) {
		if(err || typeof connection == "undefined") {
			callback(502,null);
		} else {
			connection.query('select * from `wiki_articles` where `article_hash` = ' + connection.escape(btoa(name)), function(err, rows, fields) {
				connection.release();
				
				var article = rows[0];
		
				if(err || typeof article == "undefined") {
					callback(404,null);
				} else {
					wikiPage.title = article.article_title;
					wikiPage.content = article.article_content;
					wikiPage.lastEdit = article.article_last_edit_time;
		
					callback(200,wikiPage);
				}
			});
		}
	});
}

exports.getArticleList = function(callback) {
	var wikiPageList = [];
	
	pool.getConnection(function(err, connection) {
		if(err || typeof connection == "undefined") {
			callback(502,null);
		} else {
			connection.query('select `article_title` from `wiki_articles`', function(err, rows, fields) {
				connection.release();
				
				rows.forEach(function(page) {
					wikiPageList.push(page.article_title);
				})
				
				callback(wikiPageList);
			});
		}
	});
}

exports.saveArticle = function(name, wikiText,callback) {
	//save article here
}

exports.searchArticle = function(squery,callback) {
	//search article here
}

exports.getArticleHistory = function(name,callback) {
	//get article history here
}

exports.getArticleRevision = function(name,rev,callback) {
	//get article revision here
}