//basic function
function changeColor(){
    var x = document.getElementsByTagName("BODY")[0];
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    x.style.backgroundColor ="#" + randomColor;
}

//eventlistener
let loginForm = document.getElementById("login_form");
loginForm.addEventListener("submit", (e) => {
    alert("you have submitted this form, u wordt doorverwezen");
})

//load data function for display.html
function loadData() {
    console.log('loaddata');

    //opvragen javascript.
    fetch('http://localhost:8080/test/all')
        .then(res => res.json())
        .then(data => {
            console.log('Data', data);

            let testHtml = '';
            testHtml += `
                    <tr>
                        <td><u>ID</u></td>
                        <td><u>naam</u></td>
                        <td><u>getal</u></td>
                        <td><u>bool</u></TD>
                    </tr>
            `;

            data.forEach(test => {
                testHtml += `
                    <tr>
                        <td>${test.id}</td>
                        <td>${test.naam}</td>
                        <td>${test.getal}</td>
                        <td>${test.bool}</td>
                    </tr>
                `
            });
            document.getElementById('test-table').innerHTML = testHtml;

        })


    console.log('einde loaddata');
}

function login() {
    changeColor();
    
    let email = document.getElementById("Username").value;
    let password = document.getElementById("Password").value;
    let data = {
        "email": email,
        "password": password
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
            let cookieValue = data.employee_id;
            setCookie('User', cookieValue, 1)
            window.location.href = 'display.html';
        })
        .catch(error => {
            alert('Fout :(');
        });

}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function isAdmin(cname) {
    let id = getCookie(cname);
    let data = {
        "employee_id": id
    }
    return fetch("http://localhost:8080/employee/isAdmin", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            //let value = data.employee_id;
            return data;
        })
        .catch(error => {
            alert('Fout :(');
            return false;
        });
}
