var wiki = require('../wiki');
module.exports = function(n, ba){
  var d = doNothing
  if(wiki.verbose) d = console.log
  var six = n

  // XSS 방지
  six = six.replace(/<script>|<\/script>/g, "")
  six = six.replace(/<(.*) on(.*)="(.*)">/g, "")
  d('1: '+six)

  // 개행 담당
  six = six.replace(/<br>/g, "")
  six = six.replace(/\n\n|\r\n\r\n/g, "<br>")
  six = six.replace(/\[br\]/g, "<br>")
  d('2: '+six)

  // 앞 태그
  six = six.replace(/>\s([^\n]*)/g, "<blockquote>$1</blockquote>")
  six = six.replace(/##([^#\n]*)/g, "")
  six = six.replace(/#redirect\s(.*)/g, "<script type=\"text\/javascript\">window.location.href = \"http:\/\/"+wiki.url+"\/w\/$1\"<\/script>")
  d('3: '+six)

  // 감싸는 태그
  six = six.replace(/-{4,11}/g, "<hr>") // 수평선
  six = six.replace(/\'\'\'([^\']*)\'\'\'/g, "<strong>$1</strong>") // 강조, 굵게
  six = six.replace(/\'\'([^\']*)\'\'/g, "<em>$1</em>") // 이텔릭
  six = six.replace(/__([^_]*)__/g, "<u>$1</u>") // 밑줄
  six = six.replace(/--([^-]*)--|~~([^~]*)~~/g, "<del>$1</del>") // '''취소선'''
  six = six.replace(/\^\^([^\^]*)\^\^/g, "<sup>$1</sup>") // 위첨자
  six = six.replace(/\,\,([^\,]*)\,\,/g, "<sub>$1</sub>") // 아래첨자
  d('4: '+six)

  // 제목들
  six = six.replace(/======\s?([^=]*)\s?======/g, "<h6>$1</h6>")
  six = six.replace(/=====\s?([^=]*)\s?=====/g, "<h5>$1</h5>")
  six = six.replace(/====\s?([^=]*)\s?====/g, "<h4>$1</h4>")
  six = six.replace(/===\s?([^=]*)\s?===/g, "<h3>$1</h3>")
  six = six.replace(/==\s?([^=]*)\s?==/g, "<h2>$1</h2>")
  six = six.replace(/=\s?([^=]*)\s?=/g, "<h1>$1</h1>")
  d('5: '+six)

  // 고급 태그
  six = six.replace(/\[\[([^\[\]]*)\|([^\[\]]*)]]/g, "<a href=\"/w/$1\">$2</a>") // 커스텀 이름의 링크
  six = six.replace(/\[\[([^[\[\]]*)]]/g, "<a href=\"/w/$1\">$1</a>") // 링크
  six = six.replace(/([^\n]*\.(jpeg|jpg|gif|png))/g, "<img src=\"$1\">") // 이미지
  six = six.replace(/\{{{\|\s?([^\{\}\|]*)\s?\|}}}/g, "<table class=\"wiki-closure\"><tbody><tr><td><div class=\"wiki-indent border\">$1<\/div><\/td><\/tr><\/tbody><\/table>")
  six = six.replace(/\{{{([^\{\}]*)}}}/g, "<code>$1</code>") // 코드로 바꾸기만 지원
  d('6: '+six)

  // 리스트
  six = six.replace(/\s\*\s?([^\*]*)/g, "<li>$1</li>")
  //six = six.replace(/(<li>.*<\/li>)/g, "<ul>$1</ul>")
  d('7: '+six)

  // 매크로
  six = six.replace(/\[include\((.*)\)]/g, wiki.include["$1"]) // 틀
  six = six.replace(/\[youtube\((.*)\)]/g, "미구현된 기능이므로 $1을 재생하지 못했습니다.") // 구현 예정
  six = six.replace(/\[anchor\(([^\[\]]*)\)\]/g, "<div id=\"$1\"></div>")
  d('8: '+six)


  ba(six) // My name
}
function doNothing(a) {}
