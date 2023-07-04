import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constants';
import { Loan } from './my-bookings.service';


export class Copy {
  constructor(
    public id: number,
    public book: Book,
    public loan: Loan
  ) { }
}

export class Book {
  constructor(
    public id: number,
    public title: string,
    public writer: string,
    public isbn: string,
    public photo: string,
    public copy: Copy
  ) { }
}


@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllBooks() {
    return this.http.get<Book[]>(`${API_URL}/books/all`);
  }

  searchBook(searchTerm: string) {
    const params = new HttpParams().set('searchTerm', searchTerm); 
    return this.http.get<Book[]>(`${API_URL}/books/search`, {params: params})
  }
}
