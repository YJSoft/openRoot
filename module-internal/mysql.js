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
var atob = require('atob');
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
			connection.query('select * from `wiki_articles` where `article_hash` = ' + connection.escape(btoa(unescape(encodeURIComponent(name)))), function(err, rows, fields) {
				connection.release();
				
				var article = rows[0];
		
				if(err || typeof article == "undefined") {
					callback(404,null);
				} else {
					if(article.article_etc_info != "") {
						var wikiCommands = article.article_etc_info.match(/wikiPage\.([a-zA-Z_\-]+)=([a-zA-Z_\-]+);/g);
						
						wikiCommands.forEach(function(wikiCommand) {
							try {
							    eval(wikiCommand);
							} catch (e) {
							    console.log(name + "'s article_etc_info contains invalid info - " + wikiCommand);
							}
						})
						
					}
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

exports.saveArticle = function(name, ip, wikiText, wikiComment,callback) {
	var wikiPage = new Object();
	var result = new Object();
	
	pool.getConnection(function(err, connection) {
		if(err || typeof connection == "undefined") {
			result.code = 502;
			result.message = "DB 서버와 연결할 수 없습니다.";
			result.error = err;
			callback(result);
		} else {
			connection.query('select * from `wiki_articles` where `article_hash` = ' + connection.escape(btoa(unescape(encodeURIComponent(name)))), function(err, rows, fields) {
				var article = rows[0];
				
				if(typeof article != "undefined") {
					var wikiCommands = article.article_etc_info.match(/wikiPage\.([a-zA-Z_\-]+)=([a-zA-Z_\-]+);/g);
				
					wikiCommands.forEach(function(wikiCommand) {
						try {
						    eval(wikiCommand);
						} catch (e) {
						    console.log(name + "'s article_etc_info contains invalid info - " + wikiCommand);
						}
					})
				
					if(!wikiPage.canEdit) {
						result.code = 403;
						result.message = "권한 없음";
						result.error = new Object();
						result.error.status = "문서 편집 권한이 없습니다.";
						result.error.stack = "";
						connection.release();
						callback(result);
					}
				}
				
				var query = '';
				var queryArgs = [];
				
				connection.query('SELECT MAX(article_num) as revision FROM wiki_articles',function(err, rows, fields) {
					var article_num = rows[0].revision + 1;
			
					connection.query('SELECT MAX(revision_num) as revision FROM wiki_revision',function(err, rows, fields) {
						var revision = rows[0].revision + 1;
				
						if(typeof article == "undefined") {
							//article create
							var article = new Object();
							article.article_num = article_num;
							article.article_title = name;
							article.article_hash = btoa(unescape(encodeURIComponent(name)));
							
							query = 'insert into `wiki_articles` (`article_num`,`revision_num`,`article_title`,`article_hash`,`article_content`,`article_last_ip`,`article_etc_info`) values (?,?,?,?,?,?,?)';
							queryArgs = [article.article_num, revision, article.article_title, article.article_hash, wikiText, ip, 'wikiPage.canEdit=true;wikiPage.canMove=true;wikiPage.canDelete=true;'];
						} else {
							//article edit
							query = 'update `wiki_articles` set `revision_num` = ?, `article_content` = ?, `article_last_ip` = ? where `article_hash` = ?';
							queryArgs = [revision, wikiText, ip, btoa(unescape(encodeURIComponent(name)))];
						}
				
						connection.query(query,
						queryArgs,
						function(err, rows, fields) {
							if(err) {
								result.code = 500;
								result.message = "MySQL article ERROR"
								result.error = err;
								connection.release();
								callback(result);
							}
							connection.query('insert into wiki_revision (`revision_num`,`revision_article_num`,`revision_title`,`revision_hash`,`revision_content`,`revision_comment`,`revision_ip`) values (?,?,?,?,?,?,?)',
							[revision, article.article_num, article.article_title, article.article_hash, wikiText, wikiComment, ip],
							function(err, rows, fields) {
				
								if(err) {
									result.code = 500;
									result.message = "MySQL revision ERROR";
									result.error = err;
									connection.release();
									callback(result);
								} else {
									result.code = 200;
									result.message = "success";
									connection.release();
									callback(result);
								}
							});
						});
					});
				});
			});
		}
	});
}

exports.searchArticle = function(squery,callback) {
	var wikiPageList = [];
	var wikiTitleList = [];
	var wikiPage = new Object();
	
	pool.getConnection(function(err, connection) {
		if(err || typeof connection == "undefined") {
			callback(502,null);
		} else {
			connection.query('select * from `wiki_articles` where `article_title` like ' + connection.escape('%' + squery + '%'),
			function(err, rows, fields) {
				rows.forEach(function(page) {
					if(wikiTitleList.indexOf(page.article_title) < 0) wikiPageList.push(page);
					wikiTitleList.push(page.article_title);
					
				})
				
				connection.query('select * from `wiki_articles` where `article_content` like ' + connection.escape('%' + squery + '%'),
				function(err, rows, fields) {
					connection.release();
					
					rows.forEach(function(page) {
						if(wikiTitleList.indexOf(page.article_title) < 0) wikiPageList.push(page);
						wikiTitleList.push(page.article_title);
					})

					callback(201,wikiPageList);
				});
			});
		}
	});
}

exports.gotoArticle = function(squery,callback) {
	var wikiPageList = [];
	var wikiPage = new Object();
	
	pool.getConnection(function(err, connection) {
		if(err || typeof connection == "undefined") {
			callback(502,null);
		} else {
			connection.query('select * from `wiki_articles` where `article_hash` = ?',
			[btoa(unescape(encodeURIComponent(squery)))],
			function(err, rows, fields) {
				if(typeof rows[0] != "undefined") {
					var article = rows[0];
					
					callback(200,article.article_title);
				} else {
					module.exports.searchArticle(squery,callback);
				}
			});
		}
	});
}

exports.getArticleHistory = function(name,callback) {
	var wikiHistoryList = [];
	
	pool.getConnection(function(err, connection) {
		if(err || typeof connection == "undefined") {
			callback(502,null);
		} else {
			connection.query('select * from `wiki_revision` where `revision_hash` = ?',
			[btoa(unescape(encodeURIComponent(name)))],
			function(err, rows, fields) {
				connection.release();
				
				var i = 1;
				rows.forEach(function(revision) {
					var rev = new Object();
					rev.rev = i;
					rev.ip = revision.revision_ip;
					rev.rev_id = revision.revision_num;
					rev.page = revision.revision_title;
					rev.comment = revision.revision_comment;
					wikiHistoryList.push(rev);
					
					i++;
				});
				
				callback(200,wikiHistoryList);
			});
		}
	});
}

exports.getArticleRevision = function(name,rev,callback) {
	var wikiPage = new Object();
	
	pool.getConnection(function(err, connection) {
		if(err || typeof connection == "undefined") {
			callback(502,null);
		} else {
			connection.query('select * from `wiki_revision` where `revision_num` = ?',
			[rev],
			function(err, rows, fields) {
				connection.release();
				var article = rows[0];
		
				if(err || typeof article == "undefined") {
					callback(404,null);
				} else {
					wikiPage.rev = rev;
					wikiPage.title = article.revision_title;
					wikiPage.content = article.revision_content;
					wikiPage.lastEdit = article.revision_edit_time;
					
					callback(200,wikiPage);
				}
			});
		}
	});
}