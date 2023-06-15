//load data function for display.html
//requests test objects through get method and displays properties in table
function loadData() {
    console.log('loaddata');

    //opvragen javascript.
    fetch('http://localhost:8080/test/all', {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
        }
    })
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