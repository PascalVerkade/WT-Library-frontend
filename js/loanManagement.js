function selectCopy(copy) { 
    selectedCopy = copy;
    document.getElementById("selectedCopy").value = copy.id;
  }

function showCopies(book) {
    var searchTerm = book.id;

    // Make an API call to your backend for searching books
    fetch(`${baseUrl}/copies/active?bookId=${searchTerm}`)
    .then(response => response.json())
            .then(data => {

    // Fill in the table
    var copyTableBody = document.getElementById("copyTableBody");
    copyTableBody.innerHTML = "";
    data.forEach(copy => {
        var row = copyTableBody.insertRow();

        var idCell = row.insertCell();
        idCell.innerHTML = copy.id;
        idCell.addEventListener("click", function() {
        selectCopy(copy);
        });
    });
    })
    .catch(error => console.error(error));
}