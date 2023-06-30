import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constants';
import { Employee } from 'src/app/employee/employee.component';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http:HttpClient
  ) { }

  changeUser(employee: Employee) {
    return this.http.post(`${API_URL}/employee/changeValues`, employee)
  }
}
