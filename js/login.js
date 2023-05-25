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