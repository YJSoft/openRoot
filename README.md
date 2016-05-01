# openNAMU
![오픈나무 로고](https://raw.githubusercontent.com/teamatus/openNAMU/master/public/images/on2.png)

오픈소스 버전 the seed, **openNAMU**의 수정 fork입니다. 임시 렌더러로 [PHP 나무마크 파서](https://github.com/koreapyj/php-namumark)를 이용합니다. 자체 렌더러 개발시 이전 예정입니다. 해당하는 소스의 저작권 및 라이선스는 링크된 저장소에서 확인하실 수 있습니다.

`mysql` 브랜치에서 mysql 연동 작업이 진행중으로, 최종 목표는 `wiki.json`을 기본 설정 등의 용도로만 사용하고 이외 모든 설정 및 문서를 mysql에 저장하는 것입니다.

## 설치법
`git clone https://github.com/YJSoft/openNAMU`로 저장소 파일을 받은 뒤 받은 저장소 폴더에서 `git submodule init`후 `git submodule update`로 코드를 받아오시면 됩니다. 이후 `wiki.default.json` 파일의 이름을 `wiki.json`으로 변경해 주세요.

## TIP / 참고하세요
* 임시로 PHP로 구현한 렌더러를 사용합니다. 따라서 PHP 실행 환경이 필요합니다.(웹서버는 필요치 않습니다)
* PHP 나무마크 파서에서 지원하지 않는 문법은 정상 렌더링되지 않을 수 있습니다.
* wiki.json을 수정하기 귀찮으시다면 `bin/setting`를 실행하시면 간단하게 셋팅하실 수 있습니다.
* ~~개발자를 돕기 위해~~ 디버그가 필요하시다면 `npm run-script debug`를 실행하시면 디버깅을 하실 수 있습니다. 작동하지 않으면 `node ./bin/www --debug`를 바로 실행하셔도 좋습니다.
* CSS 변경이 필요하시면 `public/stylesheets/style.css`를 변형하시거나, Pug (구 Jade) 사용법을 아시는 경우 `views/layout.jade`와 다른 파일을 변형하셔도 됩니다.
* 문서 역사는 영원히 (...) 기록됩니다. 혹시라도 지우고 싶으신 분들은 `wiki.json`을 편집하셔서 `"history"` 부분을 완전히 제거하시면 됩니다.
* 작성 금지를 하시려면, `wiki.json`의 `doc.문서명.canEdit`를 `false`로 설정하시면 됩니다.

## 기능
* /save - 현재까지의 변화를 `wiki.json`에 저장 합니다.
* /history/:page - 역사를 봅니다.
* /signin/:name - 해당 아이피의 닉네임을 설정합니다. 이름은 admin 제외 모두 등록 가능합니다.
* /signout - 닉네임을 제거합니다.

## 라이센스
별도로 명시되지 않은 경우 MIT 라이센스로 배포되고 있습니다.
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
