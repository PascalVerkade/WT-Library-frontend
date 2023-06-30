import { Component, OnInit } from '@angular/core';
import { MyBookingsService, Loan, Reservation } from '../service/data/my-bookings.service';
import { Employee } from '../employee/employee.component';
import { AuthenticationService } from '../service/authentication.service';


@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  username: string = '';
  employee: Employee = new Employee(0, '', '', '', '', false, false);
  reservations: Reservation[] = [];
  loans: Loan[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private myBookingsService: MyBookingsService
  ) { }

  ngOnInit(): void {
    this.getReservationAndLoans();
  }

  getReservationAndLoans() {
    this.username = this.authenticationService.getAuthenticatedUser()!;
    console.log(this.username)

    this.authenticationService.getUser(this.username).subscribe({
      next: data => {
        console.log(data)
        this.employee = data;
        this.getMyReservations();
        this.getMyLoans();
      }
    })
  }

  getMyReservations() {
    this.myBookingsService.getMyReservation(this.employee).subscribe({
      next: (response: any) => {
        console.log(response);
        this.reservations = response;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getMyLoans() {
    this.myBookingsService.getMyLoan(this.employee).subscribe({
      next: (response: any) => {
        console.log(response)
        this.loans = response;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  removeReservation() {
    console.log("reservation was not removed")
  }
}
