var fs = require('fs');
var env = require('system').env;

var LOGIN_URL = "https://portal.jnu.ac.kr/Common/Login/Login.aspx";
var WRITE_PAGE_URL = "http://www.jnu.ac.kr/WebApp/web/HOM/COM/Board/board.aspx?boardID=10&bbsMode=write&page=1";
var ID = env.ID;
var PW = env.PW;

var TITLE = "★★신축 주방 분리형 풀옵션★★(사진있음)예대, 생활관1분거리 원룸";
var USER_NAME = '원룸그레이스';
var CONTENTS = fs.read('modules/jnuPoster/contents.html', 'utf8');

console.log('글 작성 시작');

phantom.casperPath = './node_modules/casperjs';
phantom.injectJs('./node_modules/casperjs/bin/bootstrap.js');
 
var casper = require('casper').create({
    pageSettings: {
        loadImages: false, //The script is much faster when this field is set to false
        loadPlugins: false,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'
    }
});


//로그인페이지 접속
casper.start().thenOpen(LOGIN_URL, function() {
    console.log("페이지 접속");
});

//로그인
casper.then(function(){
    console.log("해당 id와 pw로 로그인 합니다.");
    this.evaluate(function(id, pw){
        document.getElementById("ContentPlaceHolder1_LoginUser_UserName").value = id;
        document.getElementById("ContentPlaceHolder1_LoginUser_Password").value = pw;
        document.getElementById("ContentPlaceHolder1_LoginUser_LoginButton").click();
    }, {
      id: ID,
      pw: PW
    });
});
 
casper.then(function(){ this.wait(3000, function () {} ) });


casper.thenOpen(WRITE_PAGE_URL, function() {
  console.log("글 작성 페이지 접속");
});

casper.viewport(1400, 800);
// 글 작성 시작
casper.then(function(){
    console.log("3초 후에 글이 작성됩니다.");
    this.evaluate(function(title, userName, contents){
        document.getElementById("ctl00_ctl00_ContentPlaceHolder1_PageContent_ctl00_txt_boardTitle").value = title;
        document.getElementById('ctl00_ctl00_ContentPlaceHolder1_PageContent_ctl00_txt_boardWriter').value = userName;
        // html 없이 올리는 화면
        // var iFrame = document.querySelector('.cke_wysiwyg_frame');
        // iFrame.contentWindow.document.body.innerText = contents;
    }, {
      title: TITLE,
      userName: USER_NAME,
      contents: CONTENTS
    });
});

casper.then(function(){ this.wait(1000, function () {} ) });

casper.then(function(){
    console.log("소스코드 모드 클릭");
    this.evaluate(function(){
        document.getElementById('cke_18').click();
    });
});

casper.then(function(){ this.wait(1000, function () {} ) });

casper.then(function(){
    console.log("글 내용 삽입");
    this.evaluate(function(contents){
        // 소스화면
        document.querySelector('#cke_1_contents > textarea').value = contents;
    }, {
      contents: CONTENTS
    });
});

casper.then(function(){ this.wait(1000, function () {} ) });

casper.then(function(){
    console.log("글 작성 버튼 클릭");
    this.evaluate(function(){
        document.getElementById("ctl00_ctl00_ContentPlaceHolder1_PageContent_ctl00_btnSave").click();
    });
});

casper.then(function(){ this.wait(1000, function () {} ) });

casper.then(function(){
  console.log('글 작성이 완료되었습니다');
});
 
casper.run();