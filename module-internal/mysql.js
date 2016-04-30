/*
 * @author YJSoft(yjsoft@yjsoft.pe.kr)
 * @license MIT
 * 
 * Copyright (c) 2010-2016 YJSoft
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

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