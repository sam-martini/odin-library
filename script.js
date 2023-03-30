// Show and hide the form element.
const modal = document.querySelector('.modal');
const openModal = document.querySelector('.add-btn');
const closeModal = document.querySelector('.close-btn');

openModal.addEventListener('click', () => {
    modal.showModal();
})

closeModal.addEventListener('click', () => {
    modal.close();
})