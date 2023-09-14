const addForm = document.querySelector('.todo__form__add');         //TODO追加フォーム
const addInput = document.querySelector('.todo__input__add');       //TODO追加入力欄
const todosUl = document.querySelector('.todo__todos');             //未完了TODOリスト
const donesUl = document.querySelector('.todo__dones');             //完了済TODOリスト 
const searchForm = document.querySelector('.todo__form__search');   //TODO検索フォーム
const searchInput = document.querySelector('.todo__input__search'); //TODO検索入力欄

let todoData = [];  // TODOデータ

updateTODO();


//TODOが追加された際の処理
addForm.addEventListener('submit', e => {
    e.preventDefault();

    let todoObj = {
        content: addInput.value.trim(),
        isDone: false
    };

    if (todoObj.content) {
        todoData.push(todoObj);
    }

    addInput.value = '';
    updateLS();
    updateTODO();
})


/**
 * TODO要素を作成
 */
function createTodoElement(todo) {
    
    /**
     * <li class="todo__item">
     *   <p class="todo__content"></p>
     * </li>
     */
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo__item');

    const todoContent = document.createElement('p');
    todoContent.classList.add('todo__content');
    todoContent.textContent = todo.content;
    todoItem.appendChild(todoContent);

    /**
     * <div class="todo__btn__container">
     *   <img class="todo__btn"></img>
     * </div>
     */
    const btnContainer = document.createElement('div');
    btnContainer.classList.add('todo__btn__container');
    
    const btn = document.createElement('img');
    btn.classList.add('todo__btn');

    const upBtn = btn.cloneNode(false);
    upBtn.setAttribute('src', './images/todo/up.png');

    if (!todo.isDone) {
        upBtn.classList.add('btn__edit');
        btn.classList.add('btn__isDone');
        btn.setAttribute('src', './images/todo/ok.png');
        btnContainer.appendChild(btn);
        btnContainer.appendChild(upBtn);
        todoItem.appendChild(btnContainer);
        todosUl.append(todoItem);
    } else {
        upBtn.classList.add('btn__undo');
        btn.classList.add('btn__delete');
        btn.setAttribute('src', './images/todo/cancel.png');
        btnContainer.appendChild(btn);
        btnContainer.appendChild(upBtn);
        todoItem.appendChild(btnContainer);
        donesUl.append(todoItem);
    }

    todoItem.addEventListener('click', e => {
        if (e.target.classList.contains('btn__isDone')) {
            todo.isDone = true;
        }
        if (e.target.classList.contains('btn__undo')) {
            todo.isDone = false;
        }
        if (e.target.classList.contains('btn__edit')) {
            addInput.value = e.target.parentElement.previousElementSibling.textContent;
            todoData = todoData.filter(data => data !== todo);
            addInput.focus();
        }
        if (e.target.classList.contains('btn__delete')) {
            todoData = todoData.filter(data => data !== todo);
        }

        updateLS();
        updateTODO();
    })
}


/**
 * ローカルストレージに値を更新
 */
function updateLS() {
    localStorage.setItem('myTodo', JSON.stringify(todoData));
}


/**
 * TODOを更新
 */
function updateTODO() {
    todosUl.innerHTML = '';
    donesUl.innerHTML = '';
    todoData = getTodoData();
    todoData.forEach(todo => {
        createTodoElement(todo);
    })
}


/**
 * TODOリストを取得
 */
function getTodoData() {
    return JSON.parse(localStorage.getItem('myTodo')) || [];
}


//検索された際の処理
searchForm.addEventListener('submit', () => {
    e.preventDefault();
})


//検索処理
searchInput.addEventListener('keyup', () => {
    const searchWord = searchInput.value.trim().toLowerCase();
    const todoItems = document.querySelectorAll('.todo__item');
    todoItems.forEach(todoItem => {
        todoItem.classList.remove('hide');

        if (!todoItem.textContent.toLowerCase().includes(searchWord)) {
            todoItem.classList.add('hide');
        }
    })
})