// Show and hide the form element.
const modal = document.querySelector('.modal');
const openModal = document.querySelector('.add-btn');
const closeModal = document.querySelector('.close-btn');

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

addBookToLibrary('DragonBall', 'Akira Toriyama', 192, true);
console.log(myLibrary);