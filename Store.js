class Store {
    static getBooks() {
        let books;
        let storage = localStorage.getItem('books');

        if (storage === null) {
            books = [];
        } else {
            books = JSON.parse(storage);
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        Store.updateLocalStorage(books);
    }

    static editBook(isbn, editedBook) {
        const books = Store.getBooks();

        books.forEach((book) => {
            if (book.isbn === isbn) {
                book.title = editedBook.title;
                book.author = editedBook.author;
                book.isbn = editedBook.isbn;
            }
        })

        Store.updateLocalStorage(books);
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        Store.updateLocalStorage(books);
    }

    static updateLocalStorage(books) {
        localStorage.setItem('books', JSON.stringify(books));
    }

    static exists(isbn) {
        const books = Store.getBooks();
        return books.some((book) => book.isbn === isbn);
    }
}