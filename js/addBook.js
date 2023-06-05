function saveBook() {
    //data verzamelen
    let newTitle = document.getElementsByClassName('title')[0].value;
    let newWriter = document.getElementsByClassName('writer')[0].value;
    let newIsbn = document.getElementsByClassName('isbn')[0].value;
    let newPhoto = document.getElementsByClassName('photo')[0].value;
    let newAvailable = document.getElementsByClassName('available')[0].checked;
    let newStock = document.getElementsByClassName('stock')[0].value;

    //bouwen object
    newbook = {
        "title": newTitle,
        "writer": newWriter,
        "isbn": newIsbn,
        "photo": newPhoto,
        "available": newAvailable,
        "stock": newStock
    };

    console.log(newbook);

    //data sturen via fetch
    fetch("http://localhost:8080/books/create", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newbook)
    })
        .then(response => {
            alert('Is goedgegaan');
        })
        .catch(error => {
            console.log(error);
            alert('Er is iets fouts gegaan');
        });
}

function moreBooks(){
   
    document.getElementById('book_table_body').innerHTML += `
            <tr>
                <td>
                    <input type="text" name="titel" class="title" placeholder="Titel" required>
                </td>
                <td>
                    <input type="text" name="schrijver" class="writer" placeholder="Schrijver"required>
                </td>
                <td>
                    <input type="text" name="isbn" class="isbn" placeholder="ISBN"required>
                </td>
                <td>
                    <input type="text" name="foto" class="photo" placeholder="photo-url"required>
                </td>
                <td>
                    <input type="checkbox" name="beschikbaarheid" class="available" placeholder="Beschikbaarheid"required>
                </td>
                <td>
                    <input type="number" name="voorraad" class="stock" placeholder="Voorraad"required>
                </td>
            </tr>
                `
    console.log('einde');

}

function multipleBooks(){
    let titleList = document.getElementsByClassName('title');
    let writerList = document.getElementsByClassName('writer');
    let isbnList = document.getElementsByClassName('isbn');
    let photoList = document.getElementsByClassName('photo');
    let availableList = document.getElementsByClassName('available');
    let stockList = document.getElementsByClassName('stock');
    
    var booklist = [];

    for (let i = 0; i < titleList.length ; i++) {
        book = {
            "title": titleList[i].value,
            "writer": writerList[i].value,
            "isbn": isbnList[i].value,
            "photo": photoList[i].value,
            "available": availableList[i].checked,
            "stock": stockList[i].value
        };
        booklist.push(book);
    
    }
    console.log(JSON.stringify(booklist));
    fetch("http://localhost:8080/book/createAll", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(booklist)
    })
        .then(response => {
            alert('Is goedgegaan');
        })
        .catch(error => {
            console.log(error);
            alert('Er is iets fouts gegaan');
            
        });
}