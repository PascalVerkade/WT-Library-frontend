import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../app.constants';
import { map } from 'rxjs';
import { Employee } from '../employee/employee.component';

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticatedUser'

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  employee: Employee = new Employee(0, '', '', '', '', false, false)

  constructor(
    private http: HttpClient
  ) { }

  executeJWTAuthenticationService(username: string, password: string) {
    return this.http.post<any>(
      `${API_URL}/api/auth`, {
        username,
        password
      }).pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
            this.getUser(username).subscribe({
              next: data => {
                this.employee = data
              }
            })
            return data;
          }
        )
    );
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
    return sessionStorage.getItem(TOKEN)
    }
    return null
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }

  isUserAdmin() {
    return this.employee.admin
  }

  getUser(username: string) {
    return this.http.get<Employee>(`${API_URL}/employee/${username}`)
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER)
    sessionStorage.removeItem(TOKEN)
  }


}
