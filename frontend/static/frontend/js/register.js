import {reLoad, curPage} from './open.js';

var error = 0;

function checkRePassword() {
    var password = document.getElementById('register-input password').value;
    var rePassword = document.getElementById('register-input repassword').value;
    try {
        document.getElementById('repassword-alert').remove();
        error --;
    } catch(err) {}

    if(password != rePassword) {
        var area = document.getElementById('register-repassword-errors');

        area.innerHTML += `
            <h6 style="color: red; margin: auto;" id="repassword-alert">Re-password not same with Password.</h6>
        `;
        error ++;
    }
    console.log(error);
}

function checkUserName() {
    var username = document.getElementById('register-input username').value;
    try {
        document.getElementById('register-username-alert').remove();
        error --;
    } catch(err) {}
    
    if(username.length < 6) {
        var area = document.getElementById('register-username-errors');
        
        area.innerHTML += `
            <h6 style="color: red; margin: auto;" id="register-username-alert">Username length minimun is 6 characters.</h6>
        `;
        error ++;
    }
    console.log(error);
}

function checkPassword() {
    var password = document.getElementById('register-input password').value;
    try {
        document.getElementById('password-alert').remove();
        error --;
    } catch(err) {}
    
    if(password.length < 6) {
        var area = document.getElementById('register-password-errors');
        
        area.innerHTML += `
            <h6 style="color: red; margin: auto;" id="password-alert">Password length minimun is 6 characters.</h6>
        `;
        error ++;
    }

    checkRePassword();
    console.log(error);
}

function checkEmail() {
    try {
        document.getElementById('register-email-alert').remove();
        error --;
    } catch(err) {}
    console.log(error);
}

function register() {
    var url = 'http://127.0.0.1:8000/api/register/';

    checkUserName();
    checkPassword();
    checkRePassword();
    checkEmail();

    if( !error ) {
        console.log('send');
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'username': document.getElementById('register-input username').value,
                'password': document.getElementById('register-input password').value,
                'email': document.getElementById('register-input email').value
            })
        })
        .then(resp => resp.json())
        .then(function(data) {
            if( typeof(data) != 'string' ) {
                if(data.username != null) {
                    
                    var area = document.getElementById('register-username-errors');
                    
                    area.innerHTML += `
                        <h6 style="color: red; margin: auto;" id="register-username-alert">${data.username[0]}</h6>
                    `;
                    error ++;
                }
                
                if(data.email != null) {
                    
                    var area = document.getElementById('register-email-errors');
                    
                    area.innerHTML += `
                        <h6 style="color: red; margin: auto;" id="register-email-alert">${data.email[0]}</h6>
                    `;
                    error ++;
                }
            } else {
                var body = document.getElementById('registerbox');
                body.innerHTML = `
                    <p>Register success. Do you want to <a id="register-login-text" style="cursor: pointer;color: blue;text-decoration: underline;">Login</a>?</p>
                `;
                var text = document.getElementById('register-login-text');
                text.addEventListener('click', function() {
                    var body = document.getElementById('registerbox');
                    body.innerHTML = `
                    <div class="form-input-wrapper">
                        <h4 class="register-row">Username <span style="color: red;">*</span></h4>
                        <input type="text" id="register-input username">
                        <div id="register-username-errors">
                        </div>
                        <h4 class="register-row">Password  <span style="color: red;">*</span></h4>
                        <input type="password" id="register-input password">
                        <div id="register-password-errors">
                        </div>
                        <h4 class="register-row">Re-Password  <span style="color: red;">*</span></h4>
                        <input type="password" id="register-input repassword">
                        <div id="register-repassword-errors">
                        </div>
                        <h4 class="register-row">Email</h4>
                        <input type="text" id="register-input email">
                        <div id="register-email-errors">
                        </div>
                    </div>
                    <button class="btn" id="register-submit">Sign up</button>
                    <p>Having an account? <a id="login-text" style="cursor: pointer;color: blue;text-decoration: underline;">Login</a></p>
                    `;
                    var text = document.getElementById('login-text');
                    text.addEventListener('click', function() {
                        document.getElementById('login-input username').value = '';
                        document.getElementById('login-input password').value = '';
                        reLoad(curPage, 'page-login');
                    });
                    reLoad(curPage, 'page-login');
                });
            }
        });
    }
}

var registerBtn = document.getElementById('register-submit');
registerBtn.addEventListener('click', register);

var inputArea = document.getElementById('register-input repassword');
inputArea.addEventListener('keyup', checkRePassword);

inputArea = document.getElementById('register-input username');
inputArea.addEventListener('keyup', checkUserName);

inputArea = document.getElementById('register-input password');
inputArea.addEventListener('keyup', checkPassword);

inputArea = document.getElementById('register-input email');
inputArea.addEventListener('click', checkEmail);



