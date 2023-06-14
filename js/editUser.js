window.onload = searchEmployee()

function searchEmployee() {
    var searchTerm = document.getElementById("searchTerm").value;

    // Make an API call to your backend
    fetch('http://localhost:8080/employees/search?searchTerm=' + searchTerm)
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
    fetch('http://localhost:8080/employee/makeAdmin?id=' + id)
        .then(() => searchEmployee())
}

function makeInactive(id) {
    if(confirm("Are you sure you want to remove user?")) {
        fetch('http://localhost:8080/employee/makeInactive?id=' + id)
        .then(() => searchEmployee())
    }
}

function changeFirstName(id, firstName) {
    let data = {
        "firstName": firstName,
        "employeeId": id
    }
    return fetch("http://localhost:8080/employee/changeFirstName", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

function changeLastName(id, lastName) {
    let data = {
        "lastName": lastName,
        "employeeId": id
    }
    return fetch("http://localhost:8080/employee/changeLastName", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

function changeEmail(id, email) {
    let data = {
        "email": email,
        "employeeId": id
    }
    return fetch("http://localhost:8080/employee/changeEmail", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

async function updateEmployee(id) {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;

    await changeFirstName(id, firstName);
    await changeLastName(id, lastName);
    await changeEmail(id, email);
    searchEmployee();
}