import { Component, OnInit } from '@angular/core';
import { Book, BookService } from '../service/data/book.service';
import { Employee } from '../employee/employee.component';
import { AuthenticationService } from '../service/authentication.service';
import { MyBookingsService } from '../service/data/my-bookings.service';
import { LibraryComponent } from '../library/library.component';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css']
})
export class ManageBooksComponent implements OnInit {
  books: Book[] = [];
  searchTerm: string = 'Boek';
  username: string = '';
  employee: Employee |null = null

  constructor(
    private bookService: BookService,
    private authenticationService: AuthenticationService,
    private myBookingsService: MyBookingsService,
  ) { }

  ngOnInit(): void {
    this.authenticationService.getEmployee().subscribe({
      next: data => { this.employee = data },
      error: error => { console.error('Loading employee failed: ', error) }
    })
    this.refreshBooks();
  }

  refreshBooks() {
    this.bookService.retrieveAllBooks().subscribe({
      next: response => {
        this.books = response;
      }
    });
  }

  searchBooks() {
    this.bookService.searchBook(this.searchTerm).subscribe({
      next: response => { this.books = response; }
    });
  }
}