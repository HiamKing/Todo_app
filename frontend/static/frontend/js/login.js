function login() {  
    var url = window.location.origin + '/api/login/';
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
        if( data.detail != null ) {
            try {
                document.getElementById('login-alert').remove();

            } catch( err ) {}

            var area = document.getElementById('login-errors');
                
            area.innerHTML += `
                <h6 style="color: red; width: wrap-content; height: wrap-content; margin: 0;" id="login-alert">${data.detail}</h6>
            `;
        } else {
            localStorage.setItem('username', data.username);
            location.replace(window.location.origin + '/tasklist/');
        }
    });
}


var submit = document.getElementById('login-submit');
submit.addEventListener('click', login);