window.onload = getUser();

function getUser() {
    let data = {
        "email": "test",
        "password": "test"
    }
    fetch("http://localhost:8080/employee/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("personal").innerHTML = data.firstName + " " + data.lastName;
            document.getElementById("firstName").value = data.firstName;
            document.getElementById("lastName").value = data.lastName;
            document.getElementById("passwordButton").onclick = () => {
                
                if(document.getElementById("password").value.length != 0) {
                    console.log("hi")
                    if(confirm("Are you sure you want to change your password?")) {
                       changePassword(data.employeeId); 
                    }
                }
                changeFirstName(data.employeeId);
                changeLastName(data.employeeId);
            }
        }).catch(error => console.error(error));
}

function changeFirstName(id) {
    let data = {
        "firstName": document.getElementById("firstName").value,
        "employeeId": id
    }
    fetch("http://localhost:8080/employee/changeFirstName", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(() => getUser())
}

function changeLastName(id) {
    let data = {
        "lastName": document.getElementById("lastName").value,
        "employeeId": id
    }
    fetch("http://localhost:8080/employee/changeLastName", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(() => getUser())
}

function changePassword(id) {
    let data = {
        "password": document.getElementById("password").value,
        "employeeId": id
    }
    fetch("http://localhost:8080/employee/changePassword", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(() => alert("Password changed"))
}