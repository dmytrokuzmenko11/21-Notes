// localStorage.clear()

let input = document.querySelector('.text__input');
let addButton = document.querySelector('.add__button');
let conteinerNotes = document.querySelector('.container__notes');

let arrayNotes = [];
let keyNum = num();
let text;

rebootPage();

let editBtn = document.querySelectorAll('.edit__btn');
let delBtn = document.querySelectorAll('.del__btn');
let saveBtn;

edit();
deleteNote();

addButton.addEventListener('click', function() {
    add(input.value);
})


// ======= Functions ======= //


// Перевірка кількості елементів в localStorage
function num() {
    let num;
    for (let i = 0; i <= localStorage.length; i++) {
        num = i;
    }
    return num;
}


// Додавання в localStorage
function add(value) {
    let note = new Object();
    note['key'] = `${keyNum}`;
    note['note'] = value;
    localStorage.setItem(`${keyNum}`, JSON.stringify(note))
    // створення HTML
    createNote(note.note);
    keyNum = num();
    arrayUpdate();
    location.reload();
}


// Оновлення масиву arrayNotes після натискання на 'Add'
function arrayUpdate() {
    let arrTemp = [];
    let objTemp = new Object;
    let keyInObj;
    for (let i = 0; i < localStorage.length; i++) {
        keyInObj = localStorage.key(i);
        objTemp = JSON.parse(localStorage.getItem(keyInObj));
        arrTemp.unshift(objTemp);
    }
    arrTemp.sort((a, b) => (b.key - a.key));
    arrayNotes.unshift(arrTemp[0]);
}


// Перевірка localStorage після перезавантаження сторінки та виведення відповідних HTML-блоків 
function rebootPage() {
    let parseObj = new Object;
    let keyObj;
    for (let i = 0; i < localStorage.length; i++) {
        keyObj = localStorage.key(i);
        parseObj = JSON.parse(localStorage.getItem(keyObj));
        arrayNotes.unshift(parseObj);
    }
    arrayNotes.sort(function(a, b) {
        if (a['key'] > b['key']) 
        return -1;
    });
    for (let item of arrayNotes) {
        let newArr = item;
        createNoteReboot(newArr.note, newArr.key);
    }
}


function edit() {
    for (let i = 0; i < editBtn.length; i++) {
        editBtn[i].addEventListener("click", function() {
            let el = this.closest('.note');
            let textBlock = el.firstChild;
            textBlock.setAttribute('contenteditable', 'true');
            editBtn[i].className = 'save__btn';
            editBtn[i].textContent = 'Save';
            textBlock.focus();
            saveBtn = document.querySelector('.save__btn');
            save();
        });
    }
}


function save() {
    let keyNumSave;

    saveBtn.addEventListener("click", function() {
        el = this.closest('.note');
        textBlock = el.firstChild;
        text = el.firstChild.textContent;
        textBlock.setAttribute('contenteditable', 'false');
        saveBtn.className = 'edit__btn';
        saveBtn.textContent = 'Edit';
        keyNumSave = el.className[0];
        addkey();
        edit();
        location.reload();
    });

    function addkey() {
        let obj1 = new Object;
        obj1 = JSON.parse(localStorage.getItem(`${keyNumSave}`));
        obj1['note'] = text;
        localStorage.setItem(`${keyNumSave}`, JSON.stringify(obj1));
    }

}


function deleteNote() {
    for (let i = 0; i < delBtn.length; i++) {
        delBtn[i].addEventListener("click", function() {
            let el = this.closest('.note');
            keyToDelete = el.className[0];
            localStorage.removeItem(keyToDelete);
            location.reload();
        });
    }
}


// Створення HTML
function createNote(value) {
    // .item
    let container = document.createElement('div');
    container.className = `${keyNum} note`;
    // .note
    let text = document.createElement('div');
    text.className = 'text';
    text.setAttribute('contenteditable', 'false');
    // input.value
    let textNode = document.createTextNode(`${value}`);
    // .edit__btn
    let editBtn = document.createElement('button');
    editBtn.className = 'edit__btn';
    editBtn.textContent = 'Edit';
    // .del__btn
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'del__btn';
    deleteBtn.textContent = 'Delete';

    container.append(text)
    text.append(textNode)
    container.append(editBtn)
    container.append(deleteBtn)

    return conteinerNotes.prepend(container);

}

// Створення HTML після перезавантаження сторінки
function createNoteReboot(value, classNum) {
    // .item
    let container = document.createElement('div');
    container.className = `${classNum} note`;
    // .note
    let text = document.createElement('div');
    text.className = 'text';
    text.setAttribute('contenteditable', 'false');
    // input.value
    let textNode = document.createTextNode(`${value}`);
    // .edit__btn
    let editBtn = document.createElement('button');
    editBtn.className = 'edit__btn';
    editBtn.textContent = 'Edit';
    // .del__btn
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'del__btn';
    deleteBtn.textContent = 'Delete';

    container.append(text)
    text.append(textNode)
    container.append(editBtn)
    container.append(deleteBtn)

    return conteinerNotes.append(container);
    
}