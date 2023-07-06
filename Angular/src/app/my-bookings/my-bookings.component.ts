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
  employee: Employee | null = null;
  reservations: Reservation[] = [];
  loans: LoanEmployeeCopyDto[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private myBookingsService: MyBookingsService
  ) { }

  ngOnInit(): void {
    this.authenticationService.getEmployee().subscribe({
      next: data => { this.employee = data },
      error: error => { console.error('Loading employee failed: ', error) }
    })
    this.getMyReservations();
    this.getMyLoans();
  }

  getMyReservations() {
    if (!this.employee) {
      console.warn('Employee data is not available')
    } else {
      this.myBookingsService.getMyReservation(this.employee).subscribe({
        next: (response: any) => {
          console.log('reservations: ', response);
          this.reservations = response;
        },
        error: (error) => { console.error(error); }
      })
    }
  }

  getMyLoans() {
    if (!this.employee) {
      console.warn('Employee data is not available')
    } else {
      this.myBookingsService.getMyLoan(this.employee).subscribe({
        next: (response: any) => {
          console.log('loans: ', response)
          this.loans = response;
        },
        error: (error) => { console.error(error); }
      })
    }
  }

  removeReservation(id: number) {
    this.myBookingsService.deleteReservation(id).subscribe({
      next: () => { this.getMyReservations(); },
      error: error => { console.error('Delete reservation failed: ', error) }
    })
  }
}
