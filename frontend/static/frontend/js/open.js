curPage = 'page-open';

function reLoad(page1, page2) {
    pageDel = document.getElementById(page1);
    pageDel.style.display = "none";
    pageLoad = document.getElementById(page2);
    pageLoad.style.display = "";
    curPage = page2;
}

loginBtn = document.getElementById('login-btn');
loginBtn.addEventListener('click', function() {
    reLoad(curPage, 'page-login');
});

registerBtn = document.getElementById('register-btn');
registerBtn.addEventListener('click', function() {
    reLoad(curPage, 'page-register');
});

