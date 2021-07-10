var curPage = 'page-open';

function reLoad(page1, page2) {
    var pageDel = document.getElementById(page1);
    pageDel.style.display = "none";
    var pageLoad = document.getElementById(page2);
    pageLoad.style.display = "";
    curPage = page2;
}

function checkLogin() {
    var name = localStorage.getItem('username');
    if( name != null ) {
        console.log(name);
        var navbar = document.getElementById('navbar');
        navbar.innerHTML = `
        <h4 style="font-size: 20px; margin: 10px 10px 0px 0px; color: #fff">Welcome ${name}, <a href="" id="logout-btn">Logout</a></h4>
        `;

        var logoutBtn = document.getElementById('logout-btn');
        logoutBtn.addEventListener('click', logout);
    } else {
        var navbar = document.getElementById('navbar');
        navbar.innerHTML = `
        <button class="btn" id="register-btn">Register</button>
        <button class="btn" id="login-btn">Login</button>
        `;

        var loginBtn = document.getElementById('login-btn');
        loginBtn.addEventListener('click', function() {
            if( localStorage.getItem('username') !== null ) location.replace('tasklist/')
            reLoad(curPage, 'page-login');
        });

        var registerBtn = document.getElementById('register-btn');
        registerBtn.addEventListener('click', function() {
            reLoad(curPage, 'page-register');
        });       
    }
}

function logout() {
    var url = 'api/logout/';

    fetch(url);

    localStorage.removeItem('username');
}

var text = document.getElementById('register-text');
text.addEventListener('click', function() {
    reLoad(curPage, 'page-register');
});

text = document.getElementById('login-text');
text.addEventListener('click', function() {
    if( localStorage.getItem('username') !== null ) location.replace('tasklist/')
    document.getElementById('login-input username').value = '';
    document.getElementById('login-input password').value = '';
    reLoad(curPage, 'page-login');
});

checkLogin();

export{curPage, reLoad};
