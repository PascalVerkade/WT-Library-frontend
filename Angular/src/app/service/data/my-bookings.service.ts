import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constants';
import { Employee } from 'src/app/employee/employee.component';
import { AuthenticationService } from '../authentication.service';
import { Book, Copy } from './book.service';

export class SaveReservationDTO{
  constructor(
    public bookId: number,
    public email: string
  ) { }
}

export class Reservation{
  constructor(
    public id: number,
    public book: Book,
    public employee: Employee,
    public reservationDate: Date,
    public allowed: boolean

  ) {}
}

export class Loan {
  constructor(
    public loanId: number,
    public copy: Copy,
    public employee: Employee,
    public loanDate: Date,
    public returnDate: Date
  ) {}
}

export class LoanEmployeeCopyDto {
  constructor(
    public loandId: number,
    public loanDate: Date,
    public returnDate: Date,
    public employeeId: number,
    public employeeFIrstName: String,
    public employeeLastName: String,
    public bookId: number,
    public bookTitle: String,
    public isbn: String
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class MyBookingsService {

  constructor(
    private http: HttpClient
  ) { }
 

  getMyReservation(employee: Employee) {
    return this.http.get(`${API_URL}/reservation/${employee.id}`)
  }

  getMyLoan(employee: Employee) {
    return this.http.post(`${API_URL}/loan/userByEmail`, employee)
  }

  reserveBook(bookId: number, employee: Employee){
    let saveResDTO = new SaveReservationDTO(bookId, employee.email)
    return this.http.post(`${API_URL}/reservation/makeWithEmail`, saveResDTO)
  }

  deleteReservation(reservationId: number) {
    return this.http.delete(`${API_URL}/reservation/delete/${reservationId}`)
  }
}
