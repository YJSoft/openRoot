# openNAMU
![오픈나무 로고](https://raw.githubusercontent.com/teamatus/openNAMU/master/public/images/on2.png)
오픈소스 버전 the seed, **openNAMU** 입니다.
## ToDo
- [x] 굵게, 위첨자 아래첨자 등 기본적 기능
- [x] 최소 XSS 방지
- [x] 제목들
- [x] 이미지 최소 구현
- [x] 인용구 구현
- [x] 수평선
- [x] 주석
- [x] 리다이렉트
- [x] 글상자
- [x] anchor
- [ ] 완벽하게 리스트 구현
- [ ] 표 구현
- [ ] 틀 구현
- [ ] 상위, 하위, 앵커 구현
- [ ] 이미지 크기 조정
- [ ] 하위 리스트
- [ ] 번호 있는 리스트
- [ ] 각주

## TIP / 참고하세요
* HTML 코드는 `{{{#!html (HTML 코드) }}}` 처럼 작성하실 필요 없이 바로 입력하셔도 됩니다. ~~딱히 수정이 귀찮던 건 아닙니다.~~
* 구조가 의외로 매우 간단합니다. 혹시라도 클래스 등의 출력되는 HTML 변경이 필요하시면 간단히 `namumark.js`를 커스텀하시면 됩니다.
* 검색 기능 구현이 여러운 구조입니다 (...) 혹시라도 검색 기능을 구현해야 하시는 분은 다른 엔진을 참고해 주시면 감사하겟습니다.
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
MIT 라이센스입니다.
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
