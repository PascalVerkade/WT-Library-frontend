var baseUrl = 'http://localhost:8080';
var selectedEmployee = null;
var selectedBook = null;
var selectedCopy = null;
var selectedReservation = null;
var selectedLoan = null;


//defining in selected function (ouside function scope, so accessible)
var selection;
//method used to select a row in a table (and deselect)
function clickrow(tableRow, tableBody, loan) {
    //check if clicked row is selected
    var clear = tableRow.style.backgroundColor == 'green';
    // clear the background of all rows
    var rows = tableBody.children;
    for (let i = 0; i<rows.length;i++){
        rows[i].style.backgroundColor='';
        rows[i].style.color="";
        selection="";
        selectedLoan = "";
        console.log(selection);
    }
    // set background of clicked row only if it wasn't selected already
    if(!clear){
            tableRow.style.backgroundColor="green"; 
            tableRow.style.color="white";
            selection = loan;
            selectLoan(loan);
    }
}

function selectLoan(loan) { 
  selectedLoan = loan;
}


function searchLoan() {
  var searchTerm = document.getElementById("searchTerm").value;

  // Make an API call to your backend for searching reservations
  fetch(`${baseUrl}/admin/loans/search?searchTerm=${searchTerm}`, {
    headers: {
      'Authorization': localStorage.getItem("token")
    }
  })
    .then(response => response.json())
    .then(data => {

      // Fill in the table
      var loanTableBody = document.getElementById("loanTableBody");
      loanTableBody.innerHTML = "";
      data.forEach(loan => {
        var row = loanTableBody.insertRow();
        row.addEventListener("click", function(){
          clickrow(row, loanTableBody, loan);
        })

        var firstNameCell = row.insertCell();
        firstNameCell.innerHTML = loan.employeeFirstName;

        var lastNameCell = row.insertCell();
        lastNameCell.innerHTML = loan.employeeLastName;

        var bookTitleCell = row.insertCell();
        bookTitleCell.innerHTML = loan.bookTitle;

        var copyIdCell = row.insertCell();
        copyIdCell.innerHTML = loan.copyId
        
        var dateCell = row.insertCell();
        dateCell.innerHTML = loan.loanDate;      

        var returnDateCell = row.insertCell();
        returnDateCell.innerHTML = loan.returnDate;
        
      });
    })
    .catch(error => console.error(error));
}
searchLoan()


function completeLoan() {
  if (selectedLoan) {

    // Make an API call to your backend to update the reservation
    fetch(`${baseUrl}/admin/loan/complete/${selectedLoan.loanId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
    })
      .then(response => response.json())
      .then(response => alert("Lening is compleet."))
      .then(updatedLoan => {
        console.log('Loan return date updated:', updatedLoan);

        // Refresh table
        searchLoan()
      })
      .catch(error => {
        console.error('Error updating loan return date:', error);
      });
  } else {
    console.log("Please select a reservation.");
  }
}
