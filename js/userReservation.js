var baseUrl = 'http://localhost:8080';

//upon loading window, receive al reservations and loans
window.onload = getReservation();
window.onload = getLoan();

function getReservation() {

    //hardcoded user:
    let data = {
        "email": localStorage.getItem("email")
    }
    // Make an API call to your backend for searching reservations
    fetch(`${baseUrl}/reservation/userByEmail`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {

            // Fill in the table and add event listener for selection in each row
            var reservationTableBody = document.getElementById("reservationTableBody");
            reservationTableBody.innerHTML = "";
            data.forEach(reservation => {
                var row = reservationTableBody.insertRow();
                row.addEventListener("click", function () {
                    clickrow(row, reservationTableBody, reservation);
                });

                var bookTitleCell = row.insertCell();
                bookTitleCell.innerHTML = reservation.book.title;

                var dateCell = row.insertCell();
                dateCell.innerHTML = reservation.reservationDate;
            });
        })
        .catch(error => console.error(error));
}

function getLoan() {
    //hardcoded user:
    let data = { "email": localStorage.getItem("email") }
    // Make an API call to your backend for searching reservations
    fetch(`${baseUrl}/loan/userByEmail`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {

            // Fill in the table and add event listener to each row in the table
            var loanTableBody = document.getElementById("loanTableBody");
            loanTableBody.innerHTML = "";
            data.forEach(loan => {
                var row = loanTableBody.insertRow();
               
                var bookTitleCell = row.insertCell();
                bookTitleCell.innerHTML = loan.bookTitle;

                var dateCell = row.insertCell();
                dateCell.innerHTML = loan.loanDate;

                var ingeleverdCell = row.insertCell();
                ingeleverdCell.innerHTML = loan.returnDate;
            });
        })
        .catch(error => console.error(error));
}

//defining in selected function (ouside function scope, so accessible)
var selection;
//method used to select a row in a table (and deselect)
function clickrow(tableRow, tableBody, reservation) {
    //check if clicked row is selected
    var clear = tableRow.style.backgroundColor == 'green';
    // clear the background of all rows
    var rows = tableBody.children;
    for (let i = 0; i<rows.length;i++){
        rows[i].style.backgroundColor = '';
        selection="";
        console.log(selection);
    }
    // set background of clicked row only if it wasn't selected alrady
    if(!clear){
            tableRow.style.backgroundColor = 'green'; 
            //store selection
            selection = reservation;
            console.log(selection);
    }
}


//functon to delete the reservation
function deleteReservation() {
    if (selection) {

        // create reservation object with only it's ID (only thing required)
        var reservation = {
            "id": selection.id
        };
        // Make an API call to your backend to delete the loan
        fetch(`${baseUrl}/reservation/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify(reservation)
        })
            //upate the list and clear the selected item
            .then(() => getReservation())
            selection = '';
    } else {
        console.log("Please select a reservation.");
    }
}