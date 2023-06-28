var baseUrl = 'http://localhost:8080';
var selectedEmployee = null;
var selectedBook = null;
var selectedCopy = null;
var selectedReservation = null;
var selectedLoan = null;

//defining in selected function (ouside function scope, so accessible)
var selection;    

loadData();


function loadData(){
  searchBooks();
  searchEmployee();
}

function searchEmployee() {
  var searchTerm = document.getElementById("searchTerm").value;

  // Make an API call to your backend for searching employees
  fetch(`${baseUrl}/admin/employees/search?searchTerm=${searchTerm}`, {
      headers: {
          'Authorization': localStorage.getItem("token")
      }
  })
  .then(response => response.json())
  .then(data => {

  // Fill in the table
  var employeeTableBody = document.getElementById("employeeTableBody");
  employeeTableBody.innerHTML = "";
  data.forEach(employee => {
      var row = employeeTableBody.insertRow();
      row.addEventListener("click", function () {
          clickEmployee(row, employeeTableBody, employee);
      });

      var firstNameCell = row.insertCell();
      firstNameCell.innerHTML = employee.firstName;

      var lastNameCell = row.insertCell();
      lastNameCell.innerHTML = employee.lastName;
     
      var emailCell = row.insertCell();
      emailCell.innerHTML = employee.email;
  });
  })
  .catch(error => console.error(error));
}

function searchBooks() {
  var searchTerm = document.getElementById("searchTermBooks").value;

  // Make an API call to your backend for searching books
  fetch(`${baseUrl}/books/search?searchTerm=${searchTerm}`, {
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
      
      row.addEventListener("click", function () {
          clickBook(row, bookTableBody, book);
      });

      var titleCell = row.insertCell();
      titleCell.innerHTML = book.title;

      var writerCell = row.insertCell();
      writerCell.innerHTML = book.writer;

      var isbnCell = row.insertCell();
      isbnCell.innerHTML = book.isbn;
  });
  })
  .catch(error => console.error(error));
}

function selectEmployee(employee) {
  selectedEmployee = employee;
}

function selectBook(book) {
  selectedBook = book;
  showCopies(book);
}
function selectCopy(copy) { 
  selectedCopy = copy;
}

function clickBook(tableRow, tableBody, book) {
  //check if clicked row is selected
  var clear = tableRow.style.backgroundColor == 'green';
  // clear the background of all rows
  var rows = tableBody.children;
  for (let i = 0; i<rows.length;i++){
      rows[i].style.backgroundColor='';
      rows[i].style.color="";
      selectedBook="";
      clearCopyTable();
  }
  // set background of clicked row only if it wasn't selected already
  if(!clear){
          tableRow.style.backgroundColor="green"; 
          tableRow.style.color="white";
          selectedBook="";
          selectBook(book);
  }
}

function clickEmployee(tableRow, tableBody, emp) {
  //check if clicked row is selected
  var clear = tableRow.style.backgroundColor == 'green';
  // clear the background of all rows
  var rows = tableBody.children;
  for (let i = 0; i<rows.length;i++){
      rows[i].style.backgroundColor='';
      rows[i].style.color="";
      selectedEmployee="";
  }
  // set background of clicked row only if it wasn't selected already
  if(!clear){
          tableRow.style.backgroundColor="green"; 
          tableRow.style.color="white";
          selectedEmployee = "";
          selectEmployee(emp);
  }
}

function clearCopyTable(){
  var copyTableBody = document.getElementById("copyTableBody");
  copyTableBody.innerHTML = "";
}



    function createLoan() {
      if (selectedEmployee && selectedBook && selectedCopy) {

        var loan = {
          copyId: selectedCopy.id,
          employeeId: selectedEmployee.employeeId
        };

        // Make an API call to your backend to create the reservation
        fetch(`${baseUrl}/admin/loan/make`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
          },
          body: JSON.stringify(loan)
        })
        .then(response => response.json())
        .then(response => alert("Lening is aangemaakt."))
        .then(data => {
          console.log("Loan creation backend status:", data);
          selectedReservation = "";

          // Refresh available copies
          showCopies(selectedBook)
          loadData();
        })
        .catch(error => console.error(error));
      } else {
        console.log("Please select an employee and a book and a copy.");
      }
    }

    function showCopies(book) {
      var searchTerm = book.id;
  
      // Make an API call to your backend for searching books
      fetch(`${baseUrl}/copies/active?bookId=${searchTerm}`, {
          headers: {
              'Authorization': localStorage.getItem("token")
          }
      })
      .then(response => response.json())
              .then(data => {
  
      // Fill in the table
      var copyTableBody = document.getElementById("copyTableBody");
      copyTableBody.innerHTML = "";
      data.forEach(copy => {
          var row = copyTableBody.insertRow();
          row.addEventListener("click", function () {
              clickCopy(row, copyTableBody, copy);
          });
          var idCell = row.insertCell();
          idCell.innerHTML = copy.id;
      });
      })
      .catch(error => console.error(error));
  }

  function clickCopy(tableRow, tableBody, copy) {
    //check if clicked row is selected
    var clear = tableRow.style.backgroundColor == 'green';
    // clear the background of all rows
    var rows = tableBody.children;
    for (let i = 0; i<rows.length;i++){
        rows[i].style.backgroundColor='';
        rows[i].style.color="";
        selectedCopy="";
    }
    // set background of clicked row only if it wasn't selected already
    if(!clear){
            tableRow.style.backgroundColor="green"; 
            tableRow.style.color="white";
            selectedCopy = "";
            selectCopy(copy);
    }
  }
