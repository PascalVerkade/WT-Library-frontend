import { Component, OnInit } from '@angular/core';
import { Book, BookService } from '../service/data/book.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  books: Book[] = [];
  searchTerm: string = 'Boek';

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.refreshBooks();
  }

  refreshBooks() {
    this.bookService.retrieveAllBooks().subscribe({
      next: response => {
        this.books = response;
      }
    })
  }

  searchBooks() {
    this.bookService.searchBook(this.searchTerm).subscribe({
      next: response => {
        this.books = response;
      }
    })
  }

  reserveBook() {
    console.log('reserved')
  }

}
