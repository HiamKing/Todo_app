/*
    KEY COMPONENTS:
    "activateItem" = null until an edit button is clicked. Will contain
    object of item we are editing
    "list_snapshot" = Will contain previous state of list. Used for
    removing extra rows on list update

    PROCESS:
    1 - Fetch Data and build rows "buildList()"
    2 - Create Item on form submit
    3 - Edit Item click - Prefill form and change submit URL
    4 - Delete Item - Send Item id  to delete URL
    5 - Cross out completed task - Event handle updated item

    NOTES:
    -- Add event handlers to "edit", "delete", "title"
    -- Render with strike through items completed
    -- Remove extra data on re-render
    -- CSRF Token
*/

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');
var activeItem = null;


function buildList() {
    var wrapper = document.getElementById('list-wrapper');
    wrapper.innerHTML = '';

    var url = 'http://127.0.0.1:8000/api/tasklist/';

    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        console.log('Data', data);

        var list = data;
        for(var i in list) {
            var item = `
            <div id="data-row-${list[i].id}" class="task-wrapper flex-wrapper">
                <div style="flex: 7;">
                    <span class="title">${list[i].title}</span>
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
    var url = 'http://127.0.0.1:8000/api/tasklist/';
    var title = document.getElementById('title').value

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({'title': title}),
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
    var url = `http://127.0.0.1:8000/api/tasklist/${id}/`;

    var dataChange = document.getElementById('change_data').value;

    console.log(dataChange);
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({'title': dataChange}),
    })
    .then(function(response) {
        buildList();
    });
   // buildList();
}


function deleteTask(item) {
    if(confirm('Are you sure you want to delete this task ?')) {
        var url = `http://127.0.0.1:8000/api/tasklist/${item.id}/`;

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
        })
        .then(function(response) {
            buildList();
        });
    } 
}


function markDone(item) {
    item.completed = !item.completed;

    var url = `http://127.0.0.1:8000/api/tasklist/${item.id}/`;
}

buildList();

var form = document.getElementById('form-wrapper');
form.addEventListener('submit', submitTask);