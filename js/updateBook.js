var selectedBook = null
var copyCount = null
var selectedCopy = null

function setHeaders() {
    console.log('setting headers')
    document.getElementById('bookTitle').innerHTML = `${selectedBook.title}`;
    document.getElementById('bookDetails').innerHTML = `Written by: ${selectedBook.writer}<br>ISBN: ${selectedBook.isbn}`;
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
        })
}


getBook();