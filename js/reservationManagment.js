window.onload = searchReservation();

//defining in selected function (ouside function scope, so accessible)
var selection;
//method used to select a row in a table (and deselect)
function clickrow(tableRow, tableBody) {
    //check if clicked row is selected
    var clear = tableRow.style.backgroundColor == 'green';
    // clear the background of all rows
    var rows = tableBody.children;
    for (let i = 0; i<rows.length;i++){
        rows[i].style.backgroundColor='';
        rows[i].style.color="";
        selection="";
        console.log(selection);
    }
    // set background of clicked row only if it wasn't selected already
    if(!clear){
            tableRow.style.backgroundColor="green"; 
            tableRow.style.color="white"
    }
}
    
function searchReservation() {
  var searchTerm = document.getElementById("searchTerm").value;

  // Make an API call to your backend for searching reservations
  fetch(`${baseUrl}/admin/reservation/search?searchTerm=${searchTerm}`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem("token")
    }
    })
    .then(response => response.json())
    .then(data => {

      // Fill in the table
      var reservationTableBody = document.getElementById("reservationTableBody");
      reservationTableBody.innerHTML = "";
      data.forEach(reservation => {
        var row = reservationTableBody.insertRow();
        row.addEventListener("click", function(){
          clickrow(row, reservationTableBody);
          selectReservation(reservation);
        })

        var firstNameCell = row.insertCell();
        firstNameCell.innerHTML = reservation.employee.firstName;
        
        var lastNameCell = row.insertCell();
        lastNameCell.innerHTML = reservation.employee.lastName;
        
        var bookTitleCell = row.insertCell();
        bookTitleCell.innerHTML = reservation.book.title;
        
        var dateCell = row.insertCell();
        dateCell.innerHTML = reservation.reservationDate;
        
        var allowedCell = row.insertCell();
        allowedCell.innerHTML = reservation.allowed;
        
      });
    })
    .catch(error => console.error(error));
}
    
function setOccupied() {
  if (selectedReservation) {
    // Check if the selected book has available copies
    if (selectedReservation.book.copies.length == 0 ) {
      console.log("No available copies of the book.");
      return;
    }

    // Update the reservation object with the updated allowed property
    var updatedReservation = {
      id: selectedReservation.id,
      book: selectedReservation.book,
      employee: selectedReservation.employee,
      reservationDate: selectedReservation.reservationDate,
      allowed: true
    };

    // Make an API call to your backend to update the reservation
    fetch(`${baseUrl}/admin/reservation/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
      body: JSON.stringify(updatedReservation)
    })
      .then(response => response.json())
      .then(response => alert("Reservering is opgepakt."))
      .then(data => {
        console.log("Reservation update backend status:", data);
        selectedReservation.allowed = true;

        // Refresh the search results table
        searchReservation();
      })
      .catch(error => console.error(error));
  } else {
    console.log("Please select a reservation.");
  }
}

function createLoanFromReservation() {
  if (selectedReservation && selectedCopy) {

    var loan = {
      copyId: selectedCopy.id,
      employeeId: selectedReservation.employee.employeeId
    };

    // Make an API call to your backend to create the reservation
    console.log(selectedReservation.id);
    fetch(`${baseUrl}/admin/loan/makeFromReservation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
      body: JSON.stringify({
        loanDto: loan,
        reservationId: selectedReservation.id
      })
    })
    .then(response => response.json())
    .then(response => alert("Lening is aangemaakt, oude reservering is verwijderd."))
    .then(data => {
      console.log("Loan creation backend status:", data);
      selectedReservation = null;
      document.getElementById("selectedReservation").value = "";
      document.getElementById("selectedCopy").value = "";

      // Refresh the search results table
      searchReservation();

      // Refresh available copies
      copyTableBody.innerHTML = "";
    })
    .catch(error => console.error(error));
  } else {
    console.log("Please select a reservation.");
  }
}

function cancelLoan() {
    document.getElementById("selectedReservation").value = "";
}
    
window.onload = searchReservation();
