import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constants';
import { Employee } from 'src/app/employee/employee.component';

export class Reservation{
  constructor(
    public id: number,
    public bookId: number,
    public employeeId: number,
    public reservationDate: Date,
    public allowed: boolean

  ) {}
}

export class Loan{
  constructor(
    public id: number,
    public copyId: number,
    public employeeId: number,
    public loanDate: Date,
    public returnDate: Date
  ) {}
}


@Injectable({
  providedIn: 'root'
})
export class MyBookingsService {

  constructor(
    private http: HttpClient
  ) { }

  getMyReservation(employee: Employee) {
    return this.http.post(`${API_URL}/reservation/userByEmail`, employee)
  }

  getMyLoan(employee: Employee) {
    return this.http.post(`${API_URL}/loan/userByEmail`, employee)
  }
}
