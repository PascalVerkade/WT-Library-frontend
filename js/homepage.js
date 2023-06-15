window.onload = searchBooks();

function searchBooks() {
    var searchTerm = document.getElementById("searchTermBooks").value;

    var findBook = {
        searchTerm: searchTerm,
        id: 1 ////////////////////////////////////////////////////////////////////////Change later
    };

    // Make an API call to your backend for searching books and seeing if the user made a reservation for this book
    fetch(`http://localhost:8080/books/booksReservation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        },
        body: JSON.stringify(findBook)
    })
        .then(response => response.json())
        .then(data => {

            // Fill in the table
            var bookTableBody = document.getElementById("bookTableBody");
            bookTableBody.innerHTML = "";
            data.forEach(book => {
                var row = bookTableBody.insertRow();

                var titleCell = row.insertCell();
                titleCell.innerHTML = book.title;

                var writerCell = row.insertCell();
                writerCell.innerHTML = book.writer;

                var isbnCell = row.insertCell();
                isbnCell.innerHTML = book.isbn;

                var editCell = row.insertCell();
                // Create a button element
                var button = document.createElement("button");
                button.textContent = "Reserve";
                if (book.reservationId == -1) {
                    button.onclick = () => buttonClick(button, book.id)
                } else {
                    button.style.backgroundColor = "#c8c8c8",
                        button.onclick = () => buttonUnClick(button, book.id, book.reservationId);
                }

                // Append the button to the edit cell
                editCell.appendChild(button);
            });
        })
        .catch(error => console.error(error));
}

function buttonClick(button, bookId) {
    reservationId = createReservation(bookId);
    button.style.backgroundColor = "#c8c8c8";
    button.onclick = () => buttonUnClick(button, bookId, reservationId);
}

function buttonUnClick(button, bookId, reservationId) {
    deleteReservation(reservationId);
    button.style.backgroundColor = "#000000";
    button.onclick = () => buttonClick(button, bookId)
}

function createReservation(bookId) {

    // Create the reservation object with selected employee and book
    var reservation = {
        bookId: bookId,
        employeeId: 1 ////////////////////////////////////////////////////////////////////////Change later
    };

    // Make an API call to your backend to create the reservation
    fetch(`http://localhost:8080/reservation/make`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        },
        body: JSON.stringify(reservation)
    })
        .then(response => response.json())
        .then(data => {
            return reservation.id
        })
        .catch(error => console.error(error));
}

function deleteReservation(reservationId) {
    // Create the reservation object with selected employee and book
    var reservation = {
        id: reservationId
    };


    // Make an API call to your backend to delete the reservation
    fetch(`http://localhost:8080/reservation/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        },
        body: JSON.stringify(reservation)
    })
}