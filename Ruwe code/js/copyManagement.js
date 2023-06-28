var selectedBook = null
var copyCount = null
var selectedCopy = null

function setHeaders() {
    console.log('setting headers')
    document.getElementById('bookTitle').innerHTML = `${selectedBook.title}`;
    document.getElementById('bookDetails').innerHTML = `Schrijver: ${selectedBook.writer}<br>ISBN: ${selectedBook.isbn}`;
}

function setStock() {
    console.log('setting stock')
    document.getElementById('copiesInStock').innerHTML = `${selectedBook.stock} kopieën beschikbaar`;
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

    fetch(`http://localhost:8080/copies/active?bookId=${selectedBook.id}`, {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    })
    .then(res => res.json())
    .then(data => {
        copyCount = data.length;

        resetBookStock();
    })
    .catch(error => {
        console.log(error);
        alert('Er is iets fout gegaan');
    })
}

function resetBookStock() { 
    console.log('counting stock');

    selectedBook.stock = copyCount;

    fetch(`http://localhost:8080/admin/book/update/${selectedBook.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        },
        body: JSON.stringify(selectedBook)
    })
    .then(data => {
        setStock();
    })
    .catch(error => {
        console.log(error);
        alert('Er is iets fout gegaan');
    })
}

function getBook() {
    console.log('Fetching book')

    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('bookId');

    fetch(`http://localhost:8080/book/${bookId}`, {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    })
    .then(res => res.json())
    .then(data => {
        selectedBook = data;
        setHeaders();
        setStock();
        loadAllCopies(data.id);
    })
    .catch(error => {
        console.log(error);
        alert('Er is iets fout gegaan');
    })
}

function findBorrower(copy) {
    console.log('copy id:'+copy.id)

    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8080/copies/${copy.id}/status`, {
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        })
        .then(response => {
            if (response.ok) {
            return response.text();
        }
        else if (response.status === 404) {
            throw new Error("Copy not found");
        }
        else {
            throw new Error("Something went wrong");
        }
      })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
    })
    
}

function loadAllCopies() {
    console.log('loadallcopies');

    //opvragen javascript.
    fetch(`http://localhost:8080/copies/search?bookId=${selectedBook.id}`, {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    })
    .then(res => res.json())
    .then(data => {

        let copyHtml = '';
        copyHtml += `<tbody>`;

        let tablesize = 0;
        console.log(data);
        data.forEach(copy => {
            const borrowerPromise = findBorrower(copy);

            borrowerPromise.then(borrower => {
                copyHtml += `
                    <tr>
                        <td>${copy.id}</td>
                        <td>${borrower}</td>
                        <td>${copy.active? "nee":"ja"} </td>
                        <td><button name="archive" class="btn-archive" copyId="${copy.id}" onclick="archiveThisCopy(${copy.id})">Archiveren</button></td>
                    </tr>
                `;
                
                tablesize++;
                if (tablesize==data.length) {
                    copyHtml+= "</tbody>";
                    document.getElementById('copiesTable').innerHTML += copyHtml;
                }
            })
            .catch(error=> {
                console.error(error);
                tablesize++;
                if (tablesize==data.length) {
                    copyHtml+= "</tbody>";
                    document.getElementById('copiesTable').innerHTML += copyHtml;
                }
            });
        });
        getNonArchivedBookStock();
    })
    .catch(error => {
        console.error(error);
        alert('Er is iets fout gegaan')
    })
}


function addNewCopy() {
    console.log('adding new copy')

    newcopy = {
        "bookId": selectedBook.id
    }

    //Data sturen via fetch:
    fetch(`http://localhost:8080/admin/copy/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
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
        alert('Er is iets fout gegaan')
    })
}

function setToInactive() {
    if (selectedCopy.active){
        selectedCopy.active = "false";
    }
    else {selectedCopy.active = "true";}
    console.log('archiving copy'+selectedCopy)

    fetch(`http://localhost:8080/admin/copy/update/${selectedCopy.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        },
        body: JSON.stringify(selectedCopy)
    })

    .then(data => {
        setupEmptyTable();
        loadAllCopies();
    })
    .catch(error => {
        console.log(error);
        alert('Er is iets fout gegaan')
    })
}

function archiveThisCopy(id) {
    console.log('fetching copy '+id)

    fetch(`http://localhost:8080/copy/${id}`, {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    })
    .then(response => response.json())
    .then(data => {
        selectedCopy = data;
        setToInactive();        
    })
    .catch(error => {
        console.log(error);
        alert('Er is iets fout gegaan')
    })
    
}

setupEmptyTable();
getBook();