window.onload = getUser();

function getUser() {
    let data = {
        "email": localStorage.getItem("email")
    }
    fetch("http://localhost:8080/employee/get", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
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
                    if(confirm("Are you sure you want to change your password?")) {
                       changeValues(data.employeeId); 
                    }
                } else {
                    changeValues(data.employeeId);
                }
            }
        }).catch(error => console.error(error));
}

function changeValues(id) {
    let data = {
        "firstName": document.getElementById("firstName").value,
        "lastName": document.getElementById("lastName").value,
        "password": document.getElementById("password").value,
        "employeeId": id
    }
    if(document.getElementById("password").value.length == 0) {
        data["password"] = null;
    }
    fetch("http://localhost:8080/employee/changeValues", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        },
        body: JSON.stringify(data)
    }).then(() => getUser())
}
