function isAdmin(cname, after) {
    let id = getCookie(cname);
    let data = {
        "employee_id": id
    }
    try {
        fetch("http://localhost:8080/employee/isAdmin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(data => {
            after(data)
        });
    } catch (error) {
        console.error(error);
        alert('Fout :(');
        after(false)
    }
}