var user_id = localStorage.getItem('user_id')

function buildList() {
    var wrapper = document.getElementById('list-wrapper');              
    var url = `http://127.0.0.1:8000/api/tasklist/${user_id}/`

    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        console.log('Data', data);

        var list = data;
        for(var i in list) {
            var title = `<span class="title">${list[i].title}</span>`;

            if( list[i].completed == true ) {
                title = `<strike class="title">${list[i].title}</strike>`;
            }
            
            try {
                document.getElementById(`data-row-${list[i].id}`).remove();
            } catch(err) {

            }

            var item = `
            <div id="data-row-${list[i].id}" class="task-wrapper flex-wrapper">
                <div style="flex: 7;">
                    ${title}
                </div>
                <div style="flex: 1;">
                    <button class="btn btn-sm btn-outline-info edit">Edit</button>
                </div>
                <div style="flex: 1;">
                    <button class="btn btn-sm btn-outline-dark delete">-</button>
                </div>
            </div>
            `
            wrapper.innerHTML += item;
        }

        for(var i in list) {
            var editBtn = document.getElementsByClassName('edit')[i];
            editBtn.addEventListener('click', (function(item) {
                return function() {
                    editTask(item);
                }
            })(list[i]));

            var delBtn = document.getElementsByClassName('delete')[i];
            delBtn.addEventListener('click', (function(item) {
                return function() {
                    deleteTask(item);
                };
            })(list[i]));

            var title = document.getElementsByClassName('title')[i];
            title.addEventListener('click', (function(item) {
                return function() {
                    markDone(item);
                };
            })(list[i]));
        }
    });
}


function submitTask(e) {
    e.preventDefault();
    console.log('Form submited');

    var url = `http://127.0.0.1:8000/api/tasklist/${user_id}/`;
    var title = document.getElementById('title').value

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({'user_id': user_id, 'title': title}),
    })
    .then(function(response) {
        buildList();
        document.getElementById('form').reset();
    });
}


function editTask(item) {
    console.log(item.title);
    var rowId = 'data-row-'+ `${item.id}`;
    choseRow = document.getElementById(rowId);
    choseRow.innerHTML = `
    <div style="flex: 7;">
        <input type="text" value="${item.title}" id="change_data"></input>
    </div>
    <div style="flex: 1;">
        <button class="btn btn-sm btn-outline-info change">Change</button>
    </div>
    `;
    var submitChangeBtn = choseRow.getElementsByClassName('change');
    submitChangeBtn[0].addEventListener('click', function() {
        submitChangeTask(item.id);
    });
}


function submitChangeTask(id) {
    var url = `http://127.0.0.1:8000/api/tasklist/${user_id}/${id}/`;

    var dataChange = document.getElementById('change_data').value;

    console.log(dataChange);
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({'user_id': user_id, 'title': dataChange}),
    })
    .then(function(response) {
        buildList();
    });
}


function deleteTask(item) {
    if(confirm('Are you sure you want to delete this task ?')) {
        var url = `http://127.0.0.1:8000/api/tasklist/${user_id}/${item.id}/`;

        document.getElementById(`data-row-${item.id}`).remove();
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            }
        })
        .then(function(response) {
            buildList();
        });
    } 
}


function markDone(item) {
    item.completed = !item.completed;

    var url = `http://127.0.0.1:8000/api/tasklist/${user_id}/${item.id}/`;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({'user_id': user_id, 'title': item.title, 'completed': item.completed}),
    })
    .then(function(response) {
        buildList();
    });
}

buildList();

var form = document.getElementById('form-wrapper');
form.addEventListener('submit', submitTask);