import { Component, OnInit } from '@angular/core';
import { MyBookingsService, Reservation, LoanEmployeeCopyDto } from '../service/data/my-bookings.service';
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
  loans: LoanEmployeeCopyDto[] = [];

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
      },
      error: (error) => { console.error(error); }
    })
  }

  getMyReservations() {
    this.myBookingsService.getMyReservation(this.employee).subscribe({
      next: (response: any) => {
        console.log('reservations: ', response);
        this.reservations = response;
      },
      error: (error) => { console.error(error); }
    })
  }

  getMyLoans() {
    this.myBookingsService.getMyLoan(this.employee).subscribe({
      next: (response: any) => {
        console.log('loans: ', response)
        this.loans = response;
      },
      error: (error) => { console.error(error); }
    })
  }

  removeReservation(id: number) {
    this.myBookingsService.deleteReservation(id).subscribe({
      next: () => { this.getMyReservations(); },
      error: error => { console.error('Delete reservation failed: ', error) }
    })
  }
}
