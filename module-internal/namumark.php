<?php
require dirname(__FILE__) . '/php-namumark/namumark.php';

function render($wikitext) {
	// MySQLWikiPage와는 달리 PlainWikiPage의 첫 번째 인수로 위키텍스트를 받습니다.
	$wPage = new PlainWikiPage(str_replace("<BR>",PHP_EOL,$wikitext));

	// NamuMark 생성자는 WikiPage를 인수로 받습니다.
	$wEngine = new NamuMark($wPage);

	// 위키링크의 앞에 붙을 경로를 prefix에 넣습니다.
	$wEngine->prefix = "/w";

	// toHtml을 호출하면 HTML 페이지가 생성됩니다.
	return $wEngine->toHtml();
}