document.addEventListener('DOMContentLoaded', UI.displayBooks);

const form = document.querySelector('#book-form');
const addBtn = document.querySelector('input.add');

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const { title, author, isbn } = getFormValues();
    const isbnExists = Store.exists(isbn);
    const valuesAreValidated = validateFormValues(title, author, isbn, isbnExists);

    if (valuesAreValidated) {
        const book = new Book(title, author, isbn);
        UI.addBookToList(book);
        Store.addBook(book);
        UI.showAlert("Book added successfully!", 'alert-success');
        form.reset();
    }
});

const bookList = document.querySelector('#book-list');
const saveBtn = document.querySelector('input.edit');
let selectedBook;
let currentIsbn;

bookList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        const isbn = e.target.parentElement.previousElementSibling.textContent;
        UI.deleteBook(e.target);
        Store.removeBook(isbn);
        UI.showAlert("Book removed successfully!", 'alert-success');
    } else if (e.target.classList.contains('edit')) {
        selectedBook = e.target.parentElement.parentElement;
        currentIsbn = selectedBook.children[2].textContent;
        UI.fillInFieldsWithValues(selectedBook);

        addBtn.disabled = true;
        saveBtn.style.display = 'block';
    }
});

saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const { title, author, isbn } = getFormValues();  

    let isbnExists = false;   
    if (currentIsbn !== isbn) {
        isbnExists = Store.exists(isbn);
    }

    const valuesAreValidated = validateFormValues(title, author, isbn, isbnExists);

    if (valuesAreValidated) {
        const editedBook = new Book(title, author, isbn);
        UI.editBook(selectedBook);
        Store.editBook(currentIsbn, editedBook);
        UI.showAlert("Book edited successfully!", 'alert-success');
        form.reset();
        addBtn.disabled = false;
        saveBtn.style.display = 'none';
    }
});

function validateFormValues(title, author, isbn, isbnExists) {
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields.', 'alert-danger');
    }
    else if (isbnExists) {
        UI.showAlert('Book with this ISBN already exists.', 'alert-danger');
    } else {
        return true;
    }
}

function getFormValues() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    return { title, author, isbn };
}

