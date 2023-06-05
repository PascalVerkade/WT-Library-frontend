var selectedBook = null

function getBook() {
    
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('bookId');

    console.log(bookId)

    fetch(`http://localhost:8080/book/${bookId}`)
        .then(res => res.json())
        .then(data => {

            selectedBook = data;
            document.getElementById('bookTitle').innerHTML = `${data.title}`;
            document.getElementById('bookDetails').innerHTML = `Written by: ${data.writer}<br>ISBN: ${data.isbn}`;
            console.log(data.stock)
            document.getElementById('copiesInStock').innerHTML = `${data.stock} copies in stock`;

            loadAllCopies(data.id)
        })
}

getBook();

function archiveThisCopy() {

}

function clearTable() {
    table = document.getElementById('copiesTable')
    var firstRow = table.rows[0];
    var tBody = table.tBodies[0].cloneNode(false);
    tBody.appendChild(firstRow);
    table.replaceChild(tBody, table.tBodies[0]);
}

function addNewCopy() {
    console.log('addNewCopy')

    newcopy = {
        "bookId": selectedBook.id
    }

    //Data sturen via fetch:
    fetch("http://localhost:8080/copy/create", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newcopy)
    })
    .then(response => response.json())
    .then(data => {
        table = document.getElementById('copiesTable').innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>In gebruik door</th>
                    <th>Archiveren</th>
                </tr>
            </thead>
        `

        loadAllCopies(selectedBook.id)

    })
    .catch(error => {
        console.log(error);
        alert('Er is iets fouts gegaan');
    });

    
    
}

function loadAllCopies(id) {
    console.log('loadallcopies');

    //opvragen javascript.
    fetch(`http://localhost:8080/copies/search?bookId=${id}`)
        .then(res => res.json())
        .then(data => {
            console.log('Data', data);

            let copyHtml = '';
            copyHtml += `<tbody>`;

            data.forEach(copy => {
                copyHtml += `
                    <tr>
                        <td>${copy.id}</td>
                        <td>Niemand</td>
                        <td><button name="archive" class="btn-archive" copyId="${copy.id}" onclick="archiveThisCopy(${copy.id})">Archiveren</button></td>
                    </tr>
                `
            });
            copyHtml+= "</tbody>";
            document.getElementById('copiesTable').innerHTML += copyHtml;
        })


    console.log('einde loaddata');
}