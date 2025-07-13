const library = [
    {
        isbn: '1',
        name: 'Matilda',
        author: 'Roald Dahl',
        year: '1988'
    },
    {
        isbn: '2',
        name: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        year: '1954'
    },
    {
        isbn: '3',
        name: 'Harry Potter and the Sorcerer\'s Stone',
        author: 'J.K. Rowling',
        year: '1997'
    }
];

let editMode = false;
let editingBook = null;

const form = document.getElementById('addBookForm'); // доступ к элементу по Id через DOM
const bookList = document.getElementById('libraryList');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const newBook = {
        isbn: document.getElementById('isbn').value,
        name: document.getElementById('title').value,
        author: document.getElementById('author').value,
        year: document.getElementById('year').value,
    };

    if (editMode && editingBook) {
        // Обновляем свойства у найденной книги
        editingBook.isbn = newBook.isbn;
        editingBook.name = newBook.name;
        editingBook.author = newBook.author;
        editingBook.year = newBook.year;
        editMode = false;
        editingBook = null;
        form.querySelector('#submit').value = "Add Book";
    } else {
        library.push(newBook);
    }

    renderBooks(); // всегда показываем весь список
    form.reset();
});

searchButton.addEventListener('click', function () {
    const query = searchInput.value.trim().toLowerCase();
    const results = library.filter(book =>
        book.isbn.toLowerCase().includes(query) ||
        book.name.toLowerCase().includes(query)
    );

    renderBooks(results);
});

function renderBooks(list = library){
    bookList.innerHTML = '';
    list.forEach((book) => {
        const bookItem = document.createElement('li');
        bookItem.className = 'list-group-item d-flex justify-content-between align-items-center';

        const info = document.createElement('div');
        info.innerHTML = `
            <i class="bi bi-book me-2 text-primary"></i>
            <strong>${book.name}</strong> by ${book.author} (${book.year})<br>
            <small>ISBN: ${book.isbn}</small>
        `;

        const buttons = document.createElement('div');
        buttons.className = 'btn-group';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.onclick = () => deleteBook(book.isbn);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'btn btn-warning btn-sm';
        editButton.onclick = () => {
            if (list !== library) {
                alert("Нельзя редактировать из результатов поиска. Найди книгу в общем списке.");
                return;
            }
            editBook(book);
        };

        buttons.appendChild(editButton);
        buttons.appendChild(deleteButton);
        bookItem.appendChild(info);
        bookItem.appendChild(buttons);
        bookList.appendChild(bookItem);
    });
}

function deleteBook(isbn){
    const index = library.findIndex(book => book.isbn === isbn);
    if (index !== -1) {
        library.splice(index, 1);
    }
    renderBooks();
}

function editBook(book) {
    document.getElementById('isbn').value = book.isbn;
    document.getElementById('title').value = book.name;
    document.getElementById('author').value = book.author;
    document.getElementById('year').value = book.year;

    editMode = true;
    editingBook = book;
    form.querySelector('#submit').value = "Update Book";
}
renderBooks();
