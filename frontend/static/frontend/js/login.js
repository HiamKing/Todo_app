function login() {
    var url = 'http://127.0.0.1:8000/api/login/';
    var username = document.getElementById('login-input username').value;
    var password = document.getElementById('login-input password').value;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({'username': username, 'password': password})
    })
    .then(resp => resp.json())
    .then(function(data) {
        localStorage.setItem('user_id', data.id);
        localStorage.setItem('username', data.username);
        location.replace('http://127.0.0.1:8000/tasklist/');
    });
}


var submit = document.getElementById('login-submit');
submit.addEventListener('click', login);