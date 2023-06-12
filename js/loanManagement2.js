
    function searchLoan() {
      var searchTerm = document.getElementById("searchTerm").value;

      // Make an API call to your backend for searching reservations
      fetch(`${baseUrl}/loans/search?searchTerm=${searchTerm}`)
        .then(response => response.json())
        .then(data => {

          // Fill in the table
          var loanTableBody = document.getElementById("loanTableBody");
          loanTableBody.innerHTML = "";
          data.forEach(loan => {
            var row = loanTableBody.insertRow();
            row.addEventListener("click", function(){
              selectLoan(loan);
            })

            //TODO: niet werkzaam totdat @JsonIgnore Workaround gefixed is.
            var firstNameCell = row.insertCell();
            firstNameCell.innerHTML = "issue" //TODO:loan.employee.firstName;
            

            var lastNameCell = row.insertCell();
            lastNameCell.innerHTML = "issue" //TODO:loan.employee.lastName;
            

            var bookTitleCell = row.insertCell();
            bookTitleCell.innerHTML = "issue" //TODO:loan.copy.book.title;
            

            var copyIdCell = row.insertCell();
            copyIdCell.innerHTML = "issue" //TODO:loan.copy.id;
            
            var dateCell = row.insertCell();
            dateCell.innerHTML = loan.loanDate;
           

            var returnDateCell = row.insertCell();
            returnDateCell.innerHTML = loan.returnDate;
            
          });
        })
        .catch(error => console.error(error));
    }
    
    function searchLoans() {
     
      // Make an API call to your backend for searching reservations
      fetch(`${baseUrl}/loan/allOrdered`)
        .then(response => response.json())
        .then(data => {

          // Fill in the table
          var loanTableBody = document.getElementById("loanTableBody");
          loanTableBody.innerHTML = "";
          data.forEach(loan => {
            var row = loanTableBody.insertRow();
            row.addEventListener("click", function(){
              selectLoan(loan)
            })
            //TODO: niet werkzaam totdat @JsonIgnore Workaround gefixed is.
            var firstNameCell = row.insertCell();
            firstNameCell.innerHTML = "issue" //TODO:loan.employee.firstName

            var lastNameCell = row.insertCell();
            lastNameCell.innerHTML = "issue" //TODO:loan.employee.lastName;


            var bookTitleCell = row.insertCell();
            bookTitleCell.innerHTML = "issue" //TODO:loan.copy.book.title;


            var copyIdCell = row.insertCell();
            copyIdCell.innerHTML = "issue" //TODO:loan.copy.id;


            var dateCell = row.insertCell();
            dateCell.innerHTML = loan.loanDate;


            var returnDateCell = row.insertCell();
            returnDateCell.innerHTML = loan.returnDate;

          });
        })
        .catch(error => console.error(error));
    }
    searchLoans()

    function completeLoan() {
      if (selectedLoan) {

        // Make an API call to your backend to update the reservation
        fetch(`${baseUrl}/loan/complete/${selectedLoan.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(response => alert("Lening is compleet."))
          .then(updatedLoan => {
            console.log('Loan return date updated:', updatedLoan);

            // Refresh table
            searchLoan()
          })
          .catch(error => {
            console.error('Error updating loan return date:', error);
          });
      } else {
        console.log("Please select a reservation.");
      }
    }
