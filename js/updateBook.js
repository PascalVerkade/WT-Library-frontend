var selectedBook = null

function setHeaders() {
    console.log('setting headers')
    document.getElementById('bookTitle').innerHTML = `${selectedBook.title}`;
    document.getElementById('bookDetails').innerHTML = `Schrijver: ${selectedBook.writer}<br>ISBN: ${selectedBook.isbn}`;
}

function fillTable() {
    document.getElementById('title').value = `${selectedBook.title}`;
    document.getElementById('writer').value = `${selectedBook.writer}`;
    document.getElementById('isbn').value = `${selectedBook.isbn}`;
    document.getElementById('photo').value = `${selectedBook.photo}`;
    document.getElementById('stock').value = `${selectedBook.stock}`;
    if (selectedBook.available){
        document.getElementById('available').checked = true;
    }
    else {document.getElementById('available').checked = false;}
}

function getBook() {
    console.log('Fetching book')

    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('bookId');

    fetch(`http://localhost:8080/book/${bookId}`)
        .then(res => res.json())
        .then(data => {
            console.log('book: '+bookId)
            selectedBook = data;
            setHeaders();
            fillTable();
        })
}

function updateThisBook() {
    selectedBook.title = document.getElementById('title').value
    selectedBook.writer = document.getElementById('writer').value
    selectedBook.isbn = document.getElementById('isbn').value
    selectedBook.photo = document.getElementById('photo').value
    fetch(`http://localhost:8080/book/update/${selectedBook.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedBook)
    })
    .then(data => {
        alert('Boek is geupdated!')
    })
    .catch(error => {
        console.log(error);
        alert('Er is iets fouts gegaan');
    })
}


getBook();