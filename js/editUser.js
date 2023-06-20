window.onload = searchEmployee()

//defining in selected function (ouside function scope, so accessible)
var selection;
//method used to select a row in a table (and deselect)
function clickrow(tableRow, tableBody, employee) {
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

function setElementsToSelectedEmployee(employee) {
    console.log("setting elements to selected employee")
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("makeAdmin").onclick = () => makeAdmin(employee.employeeId);
    document.getElementById("setInactive").onclick = () => makeInactive(employee.employeeId);
    document.getElementById("emailButton").onclick = () => updateEmployee(employee.employeeId);
    document.getElementById("email").value = employee.email;
    document.getElementById("firstName").value = employee.firstName;
    document.getElementById("lastName").value = employee.lastName;
}

function searchEmployee() {
    var searchTerm = document.getElementById("searchTerm").value;

    // Make an API call to your backend
    fetch('http://localhost:8080/admin/employees/search?searchTerm=' + searchTerm, {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    })
        .then(response => response.json())
        .then(data => {
            // Get the table body element
            var tableBody = document.getElementById("employeeTableBody");

            // Clear the table body before adding new rows
            tableBody.innerHTML = "";

            // Iterate over the employee data and create table rows dynamically
            data.forEach(employee => {
                // Create a new row element
                var row = tableBody.insertRow();
                row.addEventListener("click", () => {
                    document.getElementById("curUser").innerHTML = employee.email;
                    document.getElementById("firstName").value = "";
                    document.getElementById("lastName").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("makeAdmin").onclick = () => makeAdmin(employee.employeeId);
                    document.getElementById("setInactive").onclick = () => makeInactive(employee.employeeId);
                    document.getElementById("emailButton").onclick = () => updateEmployee(employee.employeeId);
                    document.getElementById("email").value = employee.email;
                    document.getElementById("firstName").value = employee.firstName;
                    document.getElementById("lastName").value = employee.lastName;
                })

                // Create new cells for each data element
                var firstNameCell = row.insertCell();
                firstNameCell.innerHTML = employee.firstName;

                var lastNameCell = row.insertCell();
                lastNameCell.innerHTML = employee.lastName;

                var emailCell = row.insertCell();
                emailCell.innerHTML = employee.email;

                var adminCell = row.insertCell();
                adminCell.innerHTML = employee.admin ? "yes" : "no";

            });
        })
        .catch(error => console.error(error));
}

function makeAdmin(id) {
    fetch('http://localhost:8080/admin/employee/makeAdmin?id=' + id, {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    })
        .then(() => searchEmployee())
}

function makeInactive(id) {
    if(confirm("Are you sure you want to remove user?")) {
        fetch('http://localhost:8080/admin/employee/makeInactive?id=' + id, {
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        })
        .then(() => searchEmployee())
    }
}

async function updateEmployee(id) {
    let data = {
        "firstName": document.getElementById("firstName").value,
        "lastName": document.getElementById("lastName").value,
        "email": document.getElementById("email").value,
        "employeeId": id
    }
    fetch("http://localhost:8080/employee/changeValues", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        },
        body: JSON.stringify(data)
    }).then(() => searchEmployee())
}