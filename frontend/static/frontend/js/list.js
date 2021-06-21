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

buildList();

function buildList() {
    var wrapper = document.getElementById('list-wrapper');

    var url = 'http://127.0.0.1:8000/api/tasklist/';

    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        console.log('Data', data);

        var list = data;
        for(var i in list) {
            var item = `
            <div id="data-row-${i}" class="task-wrapper flex-wrapper">
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
    })
}