const modal = document.querySelector('.modal');
const openModal = document.querySelector('.add-btn');
const closeModal = document.querySelector('.close-btn');
const library = document.querySelector('.book-grid');
const bookForm = document.querySelector('.book-form');


// Empty array that will store the book objects.
let myLibrary = [];

// Defines a 'Book' constructor function that takes in arguments for a title, author, number of pages and if it has been read or not.
// Assign each argument to a corresponding property on the newly created 'Book' object.
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Take arguments for the title, author, number of pages and read-status.
// Use the 'Book' constructor to create the new 'Book' object with the input.
// Push the new 'Book' object to the 'myLibrary' array.
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

// Removes a book object from the array at the specified index.
function removeBook(index) {
    myLibrary.splice(index, 1); // Pass in the index and specify just one element to be removed.
    displayBooks();
}

// Toggles the read status of a book at the specified index.
function toggleReadStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
    displayBooks();
}

// Loop through the 'myLibrary' array and create the elements for each book title, author and pages.
// Create remove button for each card that calls the removeBook function with the books index.
// Create read/unread button with the text content and border based off the read-status of the book.
// Append the elements to the DOM, inside of the main grid section.
function displayBooks() {
    library.innerHTML = '';
    myLibrary.forEach((book, index) => {
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
            removeBook(index);
        });

        const readStatusBtn = document.createElement('button');
        readStatusBtn.classList.add('read-status-btn');
        if (book.read) {
            readStatusBtn.textContent = 'Read!';
            bookCard.classList.add('read');
        } else {
            readStatusBtn.textContent = 'Unead';
            bookCard.classList.add('unread');
        }
        readStatusBtn.addEventListener('click', () => {
            toggleReadStatus(index);
            bookCard.classList.toggle('read', myLibrary[index].read);
        })


        bookCard.appendChild(removeBtn);
        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(readStatusBtn);
        library.appendChild(bookCard);
    });
}

// Calls the 'addBookToLibrary' function, passing in form inputs.
// Reset the form, close modal and refresh book display.
bookForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the form from submitting and refreshing the page

    const title = document.querySelector('.title').value;
    const author = document.querySelector('.author').value;
    const pages = document.querySelector('.pages').value;
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read);

    bookForm.reset();
    modal.close();
    displayBooks();
});


// Show and hide the form element.
openModal.addEventListener('click', () => {
    modal.showModal();
});

closeModal.addEventListener('click', () => {
    modal.close();
});