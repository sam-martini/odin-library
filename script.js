const modal = document.querySelector('.modal');
const openModal = document.querySelector('.add-btn');
const closeModal = document.querySelector('.close-btn');
const library = document.querySelector('.book-grid');
const bookForm = document.querySelector('.book-form');

// Show and hide the form element.
openModal.addEventListener('click', () => {
    modal.showModal();
});

closeModal.addEventListener('click', () => {
    modal.close();
});


// Create an empty array 'myLibrary' that will store the book objects.
let myLibrary = [];

// Define a 'Book' constructor function that takes in arguments for a title, author, number of pages and if it has been read or not.
// Inside the constructor, assign each argument to a corresponding property on the newly created 'Book' object.
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Write a 'addBookToLibrary' function that takes arguments for the title, author, number of pages and read-status.
// Use the 'Book' constructor to create the new 'Book' object with the input.
// Push the new 'Book' object to the 'myLibrary' array.
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

// Write a function that removes a book object from the array at specified index.
function removeBook(index) {
    myLibrary.splice(index, 1); // Pass in the index and specify just one element to be removed.
    displayBooks();
}

function toggleReadStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
    displayBooks();
}

// Write a 'displayBooks' function that loops through the 'myLibrary' array and create
// the elements for each book title, author and pages.
// Give each book a class of 'book-card'.
// Create a remove button for each card that calls the remove book function with the
// books index.
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
        readStatusBtn.textContent = book.read ? 'Read!' : 'Unread';
        readStatusBtn.addEventListener('click', () => {
            toggleReadStatus(index);
        })


        bookCard.appendChild(removeBtn);
        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(readStatusBtn);
        library.appendChild(bookCard);
    });
}

// Add an event listener to the submit button on the add book form.
// Listen for submit and call the 'addBookToLibrary' function, passing in the form inputs.
// Close the modal and reset the form.
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


addBookToLibrary('Dragon Ball', 'Akira Toriyama', 192, true);
displayBooks();