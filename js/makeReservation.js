    
function createReservation() {
  if (selectedEmployee && selectedBook) {

    // Create the reservation object with selected employee and book
    var reservation = {
        bookId: selectedBook.id,
        employeeId: selectedEmployee.employeeId
    };
    
    // Make an API call to your backend to create the reservation
    fetch(`${baseUrl}/reservation/make`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
      body: JSON.stringify(reservation)
    })
    .then(response => response.json())
    .then(response => alert("Reservering is gemaakt."))
    .then(data => {
      console.log("Reservation created successfully:", data);
      selectedEmployee = null;
      selectedBook = null;
      document.getElementById("selectedEmployee").value = "";
      document.getElementById("selectedBook").value = "";
    })
    .catch(error => console.error(error));
  } else {
    console.log("Please select an employee and a book.");
  }
}
