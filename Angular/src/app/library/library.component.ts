import { Component, OnInit } from '@angular/core';
import { Book, BookService } from '../service/data/book.service';
import { Employee } from '../employee/employee.component';
import { AuthenticationService } from '../service/authentication.service';
import { MyBookingsService, Reservation } from '../service/data/my-bookings.service';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  books: Book[] = [];
  searchTerm: string = 'Boek';
  username: string = '';
  employee: Employee = new Employee(0, '', '', '', '', false, false)
  reservations: Reservation[] = [];

  constructor(
    private bookService: BookService,
    private authenticationService: AuthenticationService,
    private myBookingsService: MyBookingsService
  ) { }

  ngOnInit(): void {
    this.getBooksAndReservationData();
    
  }

  getBooksAndReservationData() {
    this.username = this.authenticationService.getAuthenticatedUser()!;
    this.authenticationService.getUser(this.username).subscribe({
      next: data => {
        console.log(data)
        this.employee = data;
        this.loadData();
      }
    });
  }

  refreshBooks() {
    this.bookService.retrieveAllBooks().subscribe({
      next: response => {
        this.books = response;
      }
    });
  }

  loadData() {
    forkJoin([
      this.bookService.retrieveAllBooks(),
      this.myBookingsService.getMyReservation(this.employee)
    ]).pipe(
      map(([books, reservationsResponse]) => {
        console.log('Books: ', books);
        console.log('Reservations: ', reservationsResponse);
        const reservations = reservationsResponse as Reservation[]; // Assuming the response is an array of Reservation objects
        return { books, reservations };
      })
        // books, reservations: reservations as Reservation[] }))
    ).subscribe({
      next: ({books, reservations}) => {
        this.books = books;
        this.reservations = reservations;
        console.log('reservations from forkJoin: ', reservations)
      },
      error: error => {
        console.error('Error fetching data: ', error)
      }
    });
  }

  updateButtons(book: Book) {
    this.myBookingsService.getMyReservation(this.employee).subscribe({
      next: (response: any) => {
        console.log(response);
        this.reservations = response;
        this.hasReservationForBook(book);
      },
      error: (error) => { console.error(error); }
    })
  }


  searchBooks() {
    this.bookService.searchBook(this.searchTerm).subscribe({
      next: response => { this.books = response; }
    });
  }

  hasReservationForBook(book: Book) {
    // console.log(book.title + ' has reservation: ' + this.reservations.some((reservation) => reservation.book.id === book.id))
    return this.reservations.some((reservation) => reservation.book.id === book.id)
  }

  reserveBook(book: Book, employee: Employee) {
    this.myBookingsService.reserveBook(book.id, employee).subscribe({
      next: () => { this.updateButtons(book) },
      error: error => { console.error('Reservation failed: ', error) }
    });
  }

  cancelReservation(book: Book) {
    this.reservations.forEach(reservation => {

      if (reservation.book.id === book.id) {

        console.log('Reservation to be deleted: ', reservation)

        this.myBookingsService.deleteReservation(reservation.id).subscribe({
          next: () => { this.updateButtons(book) },
          error: error => { console.error('Delete reservation failed: ', error) }
        
        })
      }
    })
  }
}
