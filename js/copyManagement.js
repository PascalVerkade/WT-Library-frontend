var selectedBook = null
var copyCount = null
var selectedCopy = null

function setHeaders() {
    console.log('setting headers')
    document.getElementById('bookTitle').innerHTML = `${selectedBook.title}`;
    document.getElementById('bookDetails').innerHTML = `Written by: ${selectedBook.writer}<br>ISBN: ${selectedBook.isbn}`;
}

function setStock() {
    console.log('setting stock')
    document.getElementById('copiesInStock').innerHTML = `${selectedBook.stock} copies in stock`;
}

function setupEmptyTable() {
    console.log('emptying table')
    table = document.getElementById('copiesTable').innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>In gebruik door</th>
                    <th>Gearchiveerd</th>
                    <th>Archiveren</th>
                </tr>
            </thead>
        `
}

function getNonArchivedBookStock() {
    console.log('fetching non-archived book-stock')

    fetch(`http://localhost:8080/copies/active?bookId=${selectedBook.id}`)
    .then(res => res.json())
    .then(data => {
        copyCount = data.length;

        resetBookStock();
    })
    .catch(error => {
        console.log(error);
        alert('Er is iets fouts gegaan');
    })
}

function resetBookStock() { 
    console.log('counting stock');

    selectedBook.stock = copyCount;

    fetch(`http://localhost:8080/book/update/${selectedBook.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedBook)
    })
    .then(data => {
        setStock();
    })
    .catch(error => {
        console.log(error);
        alert('Er is iets fouts gegaan');
    })
}

function getBook() {
    console.log('Fetching book')

    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('bookId');

    fetch(`http://localhost:8080/book/${bookId}`)
    .then(res => res.json())
    .then(data => {
        selectedBook = data;
        setHeaders();
        setStock();
        loadAllCopies(data.id);
    })
    .catch(error => {
        console.log(error);
        alert('Er is iets fouts gegaan');
    })
}


function loadAllCopies() {
    console.log('loadallcopies');

    //opvragen javascript.
    fetch(`http://localhost:8080/copies/search?bookId=${selectedBook.id}`)
    .then(res => res.json())
    .then(data => {

        let copyHtml = '';
        copyHtml += `<tbody>`;

        data.forEach(copy => {
            copyHtml += `
                <tr>
                    <td>${copy.id}</td>
                    <td>Niemand</td>
                    <td>${copy.active? "nee":"ja"} </td>
                    <td><button name="archive" class="btn-archive" copyId="${copy.id}" onclick="archiveThisCopy(${copy.id})">Archiveren</button></td>
                </tr>
            `
        });
        copyHtml+= "</tbody>";
        document.getElementById('copiesTable').innerHTML += copyHtml;

        getNonArchivedBookStock();
    })
}


function addNewCopy() {
    console.log('adding new copy')

    newcopy = {
        "bookId": selectedBook.id
    }

    //Data sturen via fetch:
    fetch(`http://localhost:8080/copy/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newcopy)
    })
    .then(res => res.json())
    .then(data => {        
        setupEmptyTable();
        loadAllCopies(selectedBook.id);
    })
    .catch(error => {
        console.log(error);
        alert('Er is iets fouts gegaan');
    });
}

function setToInactive() {
    if (selectedCopy.active){
        selectedCopy.active = "false";
    }
    else {selectedCopy.active = "true";}
    console.log('archiving copy'+selectedCopy)

    fetch(`http://localhost:8080/copy/update/${selectedCopy.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedCopy)
    })

    .then(data => {
        setupEmptyTable();
        loadAllCopies();
    })
    .catch(error => {
        console.log(error);
        alert('Er is iets fouts gegaan');
    })
}

function archiveThisCopy(id) {
    console.log('fetching copy '+id)

    fetch(`http://localhost:8080/copy/${id}`)
    .then(response => response.json())
    .then(data => {
        selectedCopy = data;
        setToInactive();        
    })
    .catch(error => {
        console.log(error);
        alert('Er is iets fouts gegaan');
    })
    
}

setupEmptyTable();
getBook();