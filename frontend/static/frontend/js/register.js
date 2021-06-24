var error = 0;

function checkRePassword() {
    var password = document.getElementById('login-input password').value;
    var rePassword = document.getElementById('login-input repassword').value;
    try {
        document.getElementById('repassword-alert').remove();
        error --;
    } catch(err) {}

    if(password != rePassword) {
        var area = document.getElementById('repassword-errors');

        area.innerHTML += `
            <h6 style="color: red; margin: auto;" id="repassword-alert">Re-password not same with Password.</h6>
        `;
        error ++;
    }
    console.log(error);
}

function checkUserName() {
    var username = document.getElementById('login-input username').value;
    try {
        document.getElementById('username-alert').remove();
        error --;
    } catch(err) {}
    
    if(username.length < 6) {
        var area = document.getElementById('username-errors');
        
        area.innerHTML += `
            <h6 style="color: red; margin: auto;" id="username-alert">Username length minimun is 6 characters.</h6>
        `;
        error ++;
    }
    console.log(error);
}

function checkPassword() {
    var password = document.getElementById('login-input password').value;
    try {
        document.getElementById('password-alert').remove();
        error --;
    } catch(err) {}
    
    if(password.length < 6) {
        var area = document.getElementById('password-errors');
        
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
        document.getElementById('email-alert').remove();
        error --;
    } catch(err) {}
    console.log(error);
}

function register() {
    var url = 'http://127.0.0.1:8000/api/register/';

    var email = document.getElementById('login-input email').value;

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
                'username': document.getElementById('login-input username').value,
                'password': document.getElementById('login-input password').value,
                'email': document.getElementById('login-input email').value
            })
        })
        .then(resp => resp.json())
        .then(function(data) {
            if( typeof(data) != 'string' ) {
                if(data.username != null) {
                    
                    var area = document.getElementById('username-errors');
                    
                    area.innerHTML += `
                        <h6 style="color: red; margin: auto;" id="username-alert">${data.username[0]}</h6>
                    `;
                    error ++;
                }
                
                if(data.email != null) {
                    
                    var area = document.getElementById('email-errors');
                    
                    area.innerHTML += `
                        <h6 style="color: red; margin: auto;" id="email-alert">${data.email[0]}</h6>
                    `;
                    error ++;
                }
            } else {
                body = document.getElementById('registerbox');
                body.innerHTML = `
                    <p>Register success. Do you want to <a href="http://127.0.0.1:8000/login/">login</a>?</p>
                `;
            }
        });
    }
}

var registerBtn = document.getElementById('login-submit');
registerBtn.addEventListener('click', register);

var inputArea = document.getElementById('login-input repassword');
inputArea.addEventListener('keyup', checkRePassword);

var inputArea = document.getElementById('login-input username');
inputArea.addEventListener('keyup', checkUserName);

var inputArea = document.getElementById('login-input password');
inputArea.addEventListener('keyup', checkPassword);

var inputArea = document.getElementById('login-input email');
inputArea.addEventListener('click', checkEmail);


