class UI {
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-warning btn-sm edit">Edit</a>
        <a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static editBook(bookRow) {
        bookRow.children[0].textContent = document.querySelector('#title').value;
        bookRow.children[1].textContent = document.querySelector('#author').value;
        bookRow.children[2].textContent = document.querySelector('#isbn').value;
    }

    static deleteBook(element) {
        const row = element.parentElement.parentElement;
        row.remove();
    }

    static fillInFieldsWithValues(bookRow) {
        const title = bookRow.children[0].textContent;
        const author = bookRow.children[1].textContent;
        const isbn = bookRow.children[2].textContent;

        document.querySelector('#title').value = title;
        document.querySelector('#author').value = author;
        document.querySelector('#isbn').value = isbn;
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.textContent = message;

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
}