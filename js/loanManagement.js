var baseUrl = 'http://localhost:8080';
var selectedEmployee = null;
var selectedBook = null;
var selectedCopy = null;
var selectedReservation = null;
var selectedLoan = null;

function selectReservation(reservation) {
    selectedReservation = reservation;
    document.getElementById("selectedReservation").value = reservation.employee.firstName + " " + reservation.employee.lastName + " wilt " + reservation.book.title;
}

function selectEmployee(employee) {
    selectedEmployee = employee;
    document.getElementById("selectedEmployee").value = employee.firstName + " " + employee.lastName;
}
  
function selectBook(book) {
    selectedBook = book;
    document.getElementById("selectedBook").value = book.title;
}

function selectCopy(copy) { 
    selectedCopy = copy;
    document.getElementById("selectedCopy").value = copy.id;
}

function selectLoan(loan) { 
    selectedLoan = loan;
    document.getElementById("selectedLoan").value = loan.id; //TODO: veraanders naar name en boek wanneer @JsonIgnore probleem fixed
}

function searchEmployee() {
    var searchTerm = document.getElementById("searchTerm").value;

    // Make an API call to your backend for searching employees
    fetch(`${baseUrl}/employees/search?searchTerm=${searchTerm}`)
        .then(response => response.json())
        .then(data => {

        // Fill in the table
        var employeeTableBody = document.getElementById("employeeTableBody");
        employeeTableBody.innerHTML = "";
        data.forEach(employee => {
            var row = employeeTableBody.insertRow();

            var firstNameCell = row.insertCell();
            firstNameCell.innerHTML = employee.firstName;
            firstNameCell.addEventListener("click", function() {
            selectEmployee(employee);
            });

            var lastNameCell = row.insertCell();
            lastNameCell.innerHTML = employee.lastName;
            lastNameCell.addEventListener("click", function() {
            selectEmployee(employee);
            });

            var emailCell = row.insertCell();
            emailCell.innerHTML = employee.email;
            emailCell.addEventListener("click", function() {
            selectEmployee(employee);
            });
        });
        })
        .catch(error => console.error(error));
    }

    function searchBooks() {
        var searchTerm = document.getElementById("searchTermBooks").value;

        // Make an API call to your backend for searching books
        fetch(`${baseUrl}/books/search?searchTerm=${searchTerm}`)
        .then(response => response.json())
        .then(data => {

        // Fill in the table
        var bookTableBody = document.getElementById("bookTableBody");
        bookTableBody.innerHTML = "";
        data.forEach(book => {
            var row = bookTableBody.insertRow();

            var titleCell = row.insertCell();
            titleCell.innerHTML = book.title;
            titleCell.addEventListener("click", function() {
            selectBook(book);
            });

            var writerCell = row.insertCell();
            writerCell.innerHTML = book.writer;
            writerCell.addEventListener("click", function() {
            selectBook(book);
            });
            
            var isbnCell = row.insertCell();
            isbnCell.innerHTML = book.isbn;
            isbnCell.addEventListener("click", function() {
            selectBook(book);
            });
        });
        })
        .catch(error => console.error(error));
}

function showCopies(book) {
    var searchTerm = book.id;

    // Make an API call to your backend for searching books
    fetch(`${baseUrl}/copies/active?bookId=${searchTerm}`)
    .then(response => response.json())
            .then(data => {

    // Fill in the table
    var copyTableBody = document.getElementById("copyTableBody");
    copyTableBody.innerHTML = "";
    data.forEach(copy => {
        var row = copyTableBody.insertRow();

        var idCell = row.insertCell();
        idCell.innerHTML = copy.id;
        idCell.addEventListener("click", function() {
        selectCopy(copy);
        });
    });
    })
    .catch(error => console.error(error));
}