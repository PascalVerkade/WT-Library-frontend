window.onload = searchReservation();
    
    function searchReservation() {
      var searchTerm = document.getElementById("searchTerm").value;

      // Make an API call to your backend for searching reservations
      fetch(`${baseUrl}/reservation/search?searchTerm=${searchTerm}`)
        .then(response => response.json())
        .then(data => {

          // Fill in the table
          var reservationTableBody = document.getElementById("reservationTableBody");
          reservationTableBody.innerHTML = "";
          data.forEach(reservation => {
            var row = reservationTableBody.insertRow();
            row.addEventListener("click", function(){
              selectReservation(reservation);
            })

            var firstNameCell = row.insertCell();
            firstNameCell.innerHTML = reservation.employee.firstName;
           
            var lastNameCell = row.insertCell();
            lastNameCell.innerHTML = reservation.employee.lastName;
           
            var bookTitleCell = row.insertCell();
            bookTitleCell.innerHTML = reservation.book.title;
            
            var dateCell = row.insertCell();
            dateCell.innerHTML = reservation.reservationDate;
            
            var allowedCell = row.insertCell();
            allowedCell.innerHTML = reservation.allowed;
           
          });
        })
        .catch(error => console.error(error));
    }
    
    function setOccupied() {
      if (selectedReservation) {
        // Check if the selected book has available copies
        if (selectedReservation.book.copies.length == 0 ) {
          console.log("No available copies of the book.");
          return;
        }

        // Update the reservation object with the updated allowed property
        var updatedReservation = {
          id: selectedReservation.id,
          book: selectedReservation.book,
          employee: selectedReservation.employee,
          reservationDate: selectedReservation.reservationDate,
          allowed: true
        };

        // Make an API call to your backend to update the reservation
        fetch(`${baseUrl}/reservation/update`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedReservation)
        })
          .then(response => response.json())
          .then(response => alert("Reservering is opgepakt."))
          .then(data => {
            console.log("Reservation update backend status:", data);
            selectedReservation.allowed = true;

            // Refresh the search results table
            searchReservation();
          })
          .catch(error => console.error(error));
      } else {
        console.log("Please select a reservation.");
      }
    }

   function createLoanFromReservation() {
      if (selectedReservation && selectedCopy) {

        if (!selectedReservation.allowed) {
          alert("De geselecteerde reservering is nog niet opgepakt.")
          return;
        }

        var loan = {
          copyId: selectedCopy.id,
          employeeId: selectedReservation.employee.employeeId
        };

        // Make an API call to your backend to create the reservation
        console.log(selectedReservation.id);
        fetch(`${baseUrl}/loan/makeFromReservation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            loanDto: loan,
            reservationId: selectedReservation.id
          })
        })
        .then(response => response.json())
        .then(response => alert("Lening is aangemaakt, oude reservering is verwijderd."))
        .then(data => {
          console.log("Loan creation backend status:", data);
          selectedReservation = null;
          document.getElementById("selectedReservation").value = "";
          document.getElementById("selectedCopy").value = "";

          // Refresh the search results table
          searchReservation();

          // Refresh available copies
          copyTableBody.innerHTML = "";
        })
        .catch(error => console.error(error));
      } else {
        console.log("Please select a reservation.");
      }
    }

    function cancelLoan() {
        document.getElementById("selectedReservation").value = "";
    }
    
window.onload = searchReservation();
