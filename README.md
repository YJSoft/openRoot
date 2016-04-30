# openNAMU-mysql
![오픈나무 로고](https://raw.githubusercontent.com/teamatus/openNAMU/master/public/images/on2.png)

오픈소스 버전 the seed, **openNAMU**의 MySQL 지원 fork입니다. 임시로 [PHP 나무마크 파서](https://github.com/koreapyj/php-namumark)를 이용합니다. 해당하는 소스의 저작권 및 라이선스는 링크된 저장소에서 확인하실 수 있습니다.

## 설치법
아직 설치를 지원하지 않습니다. 설치는 master 브랜치의 코드로 해주세요.

## TIP / 참고하세요
* 렌더링 부분은 PHP로 구현되어 있습니다. 따라서 PHP 실행 환경이 필요합니다.(웹서버는 필요치 않습니다)
* PHP 나무마크 파서에서 지원하지 않는 문법은 정상 렌더링되지 않을 수 있습니다.
* wiki.json에는 이제 설정(위키 제목,대문 문서,DB 연결정보)만이 포함됩니다.
* ~~개발자를 돕기 위해~~ 디버그가 필요하시다면 `npm run-script debug`를 실행하시면 디버깅을 하실 수 있습니다. 작동하지 않으면 `node ./bin/www --debug`를 바로 실행하셔도 좋습니다.
* CSS 변경이 필요하시면 `public/stylesheets/style.css`를 변형하시거나, Pug (구 Jade) 사용법을 아시는 경우 `views/layout.jade`와 다른 파일을 변형하셔도 됩니다.

## 기능
정리 예정입니다.

## 라이센스
별도의 라이센스가 명시되지 않은 한 MIT 라이센스로 배포되고 있습니다.
```
Copyright (c) 2016 Jeon-Sung

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
```
