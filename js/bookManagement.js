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
    fetch(`http://localhost:8080/book/${bookId}`, {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(data => {

            document.getElementById('UpdateHeader').innerHTML = `Update ${data.title}`;
            selectedBook = data;

        })
    console.log(bookId)
    
    document.getElementById('addCopy').disabled = false;
    document.getElementById('updateBook').disabled = false;
    document.getElementById('archiveBook').disabled = false;
    document.getElementById('KeywordInput').disabled = false;
    document.getElementById('addKeyword').disabled = false;
}

function searchBooks() {
    var searchTerm = document.getElementById("searchTermBooks").value;

    // Make an API call to your backend for searching books
    fetch(`http://localhost:8080/books/search?searchTerm=${searchTerm}`, {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    })
        .then(response => response.json())
        .then(data => {

            // Fill in the table
            var bookTableBody = document.getElementById("bookTableBody");
            bookTableBody.innerHTML = "";
            data.forEach(book => {
                var row = bookTableBody.insertRow();

                var photoCell = row.insertCell();
                photoCell.innerHTML = book.photo;

                var titleCell = row.insertCell();
                titleCell.innerHTML = book.title;

                var writerCell = row.insertCell();
                writerCell.innerHTML = book.writer;


                var editCell = row.insertCell();
                // Create a button element
                var button = document.createElement("button");
                button.textContent = "Selecteren";
                button.onclick = () => {
                    selectBook(book.id)
                }
                
                var isbnCell = row.insertCell();
                isbnCell.innerHTML = book.active?"nee":"ja";

                // Append the button to the edit cell
                editCell.appendChild(button);
            });
        })
        .catch(error => console.error(error));
}
  

function loadAllBooks() {
    console.log('loadallbooks');

    //opvragen javascript.
    fetch('http://localhost:8080/books/all', {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log('Data', data);

            let bookHtml = '';
            bookHtml += `<tbody id="bookTableBody">`;

            data.forEach(book => {
                bookHtml += `
                    <tr>
                        <td><img src="${book.photo}" name="${book.photo}" id="${book.photo}" alt="${book.title}" width="70"></td>
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

function addThisKeyword() {
    var keyword = document.getElementById('KeywordInput').value;
    var KeywordDto = {
        keyword: keyword,
        bookId: selectedBook.id
    };

    // Check if the keyword is empty
    if (document.getElementById('KeywordInput') == '') {
        alert("Keyword cannot be empty.");
        return;
    }

    // Perform a POST request to the backend API to add the keyword
    fetch('http://localhost:8080/admin/keywords/make', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
        },
        body: JSON.stringify(KeywordDto)
    })
    .then(response => {
        if (response.ok) {
        // Keyword added successfully
        alert("Keyword has been added to the selected book.")
        console.log('Keyword added:', keyword);

        // Empty the field
        document.getElementById('KeywordInput').value = '';
        } else {
        console.error('Failed to add keyword:', keyword);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function archiveThisCopy(copy) {
    if (copy.active){
        copy.active = "false";
        console.log('archiving copy '+copy);

        fetch(`http://localhost:8080/admin/copy/update/${copy.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
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
    fetch(`http://localhost:8080/copies/search?bookId=${selectedBook.id}`, {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    })
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

    fetch(`http://localhost:8080/admin/book/update/${selectedBook.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
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