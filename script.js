// The 'Book' class is a constructor function that takes in arguments for the properties of a book and creates a new book object with those properties.
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

// The 'Library' class is a blueprint for creating a library object that can store and manage a collection of book objects
class Library {
    // Constructor method that initializes the books array and sets up the necessary event listeners for the form submission and modal buttons
    constructor() {
        this.books = [];

        this.library = document.querySelector('.book-grid');
        this.bookForm = document.querySelector('.book-form');
        this.modal = document.querySelector('.modal');
        this.openModal = document.querySelector('.add-btn');
        this.closeModal = document.querySelector('.close-btn');

        this.bookForm.addEventListener('submit', this.addBookToLibrary.bind(this));
        this.openModal.addEventListener('click', () => this.modal.showModal());
        this.closeModal.addEventListener('click', () => this.modal.close());
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.modal.close();
            }
        });
    }

    // Creates a new book object with the form input values, adds it to the books array, and then resets
    addBookToLibrary(e) {
        e.preventDefault(); // Prevent the form from submitting and refreshing the page
        const title = document.querySelector('.title').value;
        const author = document.querySelector('.author').value;
        const pages = document.querySelector('.pages').value;
        const read = document.getElementById('read').checked;

        const book = new Book(title, author, pages, read);
        this.books.push(book);

        this.bookForm.reset();
        this.modal.close();
        this.displayBooks();
    }

    // Removes a book object from the array at the specified index.
    removeBook(index) {
        this.books.splice(index, 1); // Pass in the index and specify just one element to be removed.
        this.displayBooks();
    }

    // Toggles the read status of a book at the specified index.
    toggleReadStatus(index) {
        this.books[index].read = !this.books[index].read;
        this.displayBooks();
    }

    // Creates and renders the DOM elements that represent the current state of the myLibrary array, including the ability to remove books and toggle the read status of books
    displayBooks() {
        this.library.innerHTML = '';
        this.books.forEach((book, index) => {
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');

            const title = document.createElement('p');
            title.textContent = book.title;

            const author = document.createElement('p');
            author.textContent = book.author;

            const pages = document.createElement('p');
            if (book.pages > 0) {
                pages.textContent = `${book.pages} pages`;
            };

            const removeBtn = document.createElement('div');
            removeBtn.classList.add('remove-btn');
            removeBtn.textContent = 'x';
            removeBtn.addEventListener('click', () => {
                this.removeBook(index);
            });

            const readStatusBtn = document.createElement('button');
            readStatusBtn.classList.add('read-status-btn');
            if (book.read) {
                readStatusBtn.textContent = 'Read!';
                bookCard.classList.add('read');
            } else {
                readStatusBtn.textContent = 'Unread';
                bookCard.classList.add('unread');
            };
            readStatusBtn.addEventListener('click', () => {
                this.toggleReadStatus(index);
                bookCard.classList.toggle('read', this.books[index].read);
            });

            bookCard.appendChild(removeBtn);
            bookCard.appendChild(title);
            bookCard.appendChild(author);
            bookCard.appendChild(pages);
            bookCard.appendChild(readStatusBtn);
            this.library.appendChild(bookCard);
        });
    }
}

// Create an instance of the Library class and store it in the myLibrary constant. 
// This object has all the properties and methods defined in the Library class.
const myLibrary = new Library();