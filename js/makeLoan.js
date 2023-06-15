
    function selectBook(book) {
      selectedBook = book;
      document.getElementById("selectedBook").value = book.title;
      showCopies(book)
    }

    function createLoan() {
      if (selectedEmployee && selectedBook && selectedCopy) {

        var loan = {
          copyId: selectedCopy.id,
          employeeId: selectedEmployee.employeeId
        };

        // Make an API call to your backend to create the reservation
        fetch(`${baseUrl}/loan/make`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loan)
        })
        .then(response => response.json())
        .then(response => alert("Lening is aangemaakt."))
        .then(data => {
          console.log("Loan creation backend status:", data);
          selectedReservation = null;
          document.getElementById("selectedEmployee").value = "";
          document.getElementById("selectedBook").value = "";
          document.getElementById("selectedCopy").value = "";
          // Refresh available copies
          showCopies(selectedBook)
        })
        .catch(error => console.error(error));
      } else {
        console.log("Please select an employee and a book and a copy.");
      }
    }
