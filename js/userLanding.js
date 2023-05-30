function loadAllBooks() {
    console.log('loadallbooks');

    //opvragen javascript.
    fetch('http://localhost:8080/book/all')
        .then(res => res.json())
        .then(data => {
            console.log('Data', data);

            let bookHtml = '';
            bookHtml += `<tbody>`;

            data.forEach(book => {
                bookHtml += `
                    <tr>
                        <td>${book.title}</td>
                        <td>${book.writer}</td>
                        <td>${book.isbn}</td>
                        <td>${book.available}</td>
                        <td>${book.stock}</td>
                        <td>${book.photo}</td>
                    </tr>
                `
            });
            bookHtml+= "</tbody>";
            
            document.getElementById('AllTable').innerHTML += bookHtml;
        })


    console.log('einde loaddata');
}

loadAllBooks();