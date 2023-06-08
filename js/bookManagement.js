var selectedBook = null

function setupEmptyTable() {
    table = document.getElementById('BooksTable').innerHTML = `
        <thead>
            <tr>
                <th>foto</th>
                <th>Titel</th>
                <th>Schrijver</th>
                <th>Update</th>
                <th>Gearchiveerd</th>
            </tr>
        </thead>
        `
}

function selectBook(bookId) {
    fetch(`http://localhost:8080/book/${bookId}`)
        .then(res => res.json())
        .then(data => {

            document.getElementById('UpdateHeader').innerHTML = `Update ${data.title}`;
            selectedBook = data;

        })
    console.log(bookId)
    
    document.getElementById('addCopy').disabled = false;
    document.getElementById('updateBook').disabled = false;
    document.getElementById('archiveBook').disabled = false;
}
  

function loadAllBooks() {
    console.log('loadallbooks');

    //opvragen javascript.
    fetch('http://localhost:8080/books/all')
        .then(res => res.json())
        .then(data => {
            console.log('Data', data);

            let bookHtml = '';
            bookHtml += `<tbody>`;

            data.forEach(book => {
                bookHtml += `
                    <tr>
                        <td>${book.photo}</td>
                        <td>${book.title}</td>
                        <td>${book.writer}</td>
                        <td><button name="select" class="btn-select" bookId="${book.id}" onclick="selectBook(${book.id})">Selecteren</button></td>
                        <td>${book.active? "nee":"ja"} </td>
                    </tr>
                `
            });
            bookHtml+= "</tbody>";
            document.getElementById('BooksTable').innerHTML += bookHtml;
        })
    console.log('einde loaddata');
}

function copyThisBook() {
    window.location.href = `copyManagement.html?bookId=${selectedBook.id}`
}

function updateThisBook() {
    window.location.href = `updateBook.html?bookId=${selectedBook.id}`
}

function archiveThisCopy(copy) {
    if (copy.active){
        copy.active = "false";
        console.log('archiving copy '+copy);

        fetch(`http://localhost:8080/copy/update/${copy.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(copy)
        })
        .catch(error => {
            console.log(error);
            alert('Er is iets fouts gegaan');
        })
    }
}

function archiveAllCopies() {
    console.log('loadallcopies');

    //opvragen javascript.
    fetch(`http://localhost:8080/copies/search?bookId=${selectedBook.id}`)
    .then(res => res.json())
    .then(data => {
        console.log('Data', data);

        data.forEach(copy => {
            archiveThisCopy(copy);
        });
    })
    .catch(error => {
        console.log(error);
        alert('Er is iets fouts gegaan');
    })
}

function archiveThisBook() {
    if (selectedBook.active){
        selectedBook.active = "false";
        archiveAllCopies();
    }
    else { selectedBook.active = "true"; }
    console.log(selectedBook.active)

    fetch(`http://localhost:8080/book/update/${selectedBook.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedBook)
    })

    .then(data => {
        console.log('Data' + data);
        setupEmptyTable();
        loadAllBooks();
        //document.getElementById('bookArchivedHeader').innerHTML = `${selectedBook.title} was archived`;
    })
    .catch(error => {
        console.log(error);
        alert('Er is iets fouts gegaan');
    })
}

setupEmptyTable();
loadAllBooks();