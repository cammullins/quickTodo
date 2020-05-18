$(function () {
    $("#todo-list, #done-list, #monday-list, #tuesday-list, #wednesday-list, #thursday-list, #friday-list").sortable({
        connectWith: ".connectedSortable",
        receive: sortOver
    }).disableSelection();
});

fetch('/todos')
    .then(r => r.json())
    .then(todos => {
        createTodos(todos)
    })

function createTodos(todos){
    console.log(todos)
    todos.forEach( todo => createTodo(todo))
}

function createTodo(todo){
    // <li class="ui-state-default" data-toggle="modal" data-target="#myModal">Event Listeners</li>
    let li = document.createElement('li');
    li.setAttribute('data-day', todo.day);
    li.setAttribute('data-id', todo.id);
    li.setAttribute('data-toggle', "modal")
    li.setAttribute('data-target', "#myModal")
    li.innerHTML = todo.name;

    let col = document.getElementById(`${todo.day}-list`);
    col !== null ? 
        col.appendChild(li) :
        document.getElementById(`todo-list`).appendChild(li);
}

function sortOver(e, ui){
    let list = e.target,
        currDay =list.id.split('-')[0],
        li = ui.item[0];

    fetch('/todos', {
        method: "POST",
        headers: {
             "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
            id: li.dataset.id,
            day: currDay
        })
    })
        .then( res => res.json())
        .then(res => {
            if(res.msg === "Success") {
                li.dataset.day = currDay
            }
        })

}