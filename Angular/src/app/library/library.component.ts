import { Component, OnInit } from '@angular/core';
import { Book, BookService } from '../service/data/book.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.refreshBooks();
  }

  refreshBooks() {
    this.bookService.retrieveAllBooks().subscribe({
      next: response => {
        console.log(response);
        this.books = response;
      }
    })
  }

  reserveBook() {
    console.log('reserved')
  }

}
