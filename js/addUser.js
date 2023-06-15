function createAccount() {
    let email = document.getElementById("Email").value;
    let password = document.getElementById("Password").value;
    let firstName = document.getElementById("First Name").value;
    let lastName = document.getElementById("Last Name").value;
    let admin = document.getElementById("Admin").checked;
    let data = {
        "email": email,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "active": true,
        "admin": admin
    }
    fetch("http://localhost:8080/admin/employee/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        },
        body: JSON.stringify(data)
    })
        .then(response => alert("Toegevoegd"))
        .catch(error => {
            alert('Fout :(');
        });
    }