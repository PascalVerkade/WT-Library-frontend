//basic function
function changeColor(){
    var x = document.getElementsByTagName("BODY")[0];
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    x.style.backgroundColor ="#" + randomColor;
}

window.onload = function() {
    if (localStorage.getItem("token") !== null) {
        window.location.href = "homepage.html"
    }
}

function login() {

    // Retrieve input fields
    var details = {
        username: document.getElementById("Username").value,
        password: document.getElementById("Password").value
    };

    // Make an API call to your backend to create the reservation
    fetch(`http://localhost:8080/api/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(details)
    })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("token", data.token)
            localStorage.setItem("email", details.username)
            window.location.href = "homepage.html"
        })
        .catch(error => console.error(error));
}
