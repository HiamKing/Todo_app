var curPage = 'page-open';

function reLoad(page1, page2) {
    var pageDel = document.getElementById(page1);
    pageDel.style.display = "none";
    var pageLoad = document.getElementById(page2);
    pageLoad.style.display = "";
    curPage = page2;
}

var loginBtn = document.getElementById('login-btn');
loginBtn.addEventListener('click', function() {
    reLoad(curPage, 'page-login');
});

var registerBtn = document.getElementById('register-btn');
registerBtn.addEventListener('click', function() {
    reLoad(curPage, 'page-register');
});

var text = document.getElementById('register-text');
text.addEventListener('click', function() {
    reLoad(curPage, 'page-register');
});

text = document.getElementById('login-text');
text.addEventListener('click', function() {
    reLoad(curPage, 'page-login');
});

export{curPage, reLoad};
