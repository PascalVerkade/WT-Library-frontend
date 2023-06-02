function openPopup(bookId) {
    fetch(`http://localhost:8080/book/${bookId}`)
        .then(res => res.json())
        .then(data => {

            document.getElementById('UpdateHeader').innerHTML = `Update ${data.title}`

        })
    console.log(bookId)
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
                        <td><button name="update" onclick="openPopup(${book.id})">Update ${book.title}</button></td>


                    </tr>
                `
            });
            bookHtml+= "</tbody>";
            
            document.getElementById('AllTable').innerHTML += bookHtml;
        })


    console.log('einde loaddata');
}

loadAllBooks();