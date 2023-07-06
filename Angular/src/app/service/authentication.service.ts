import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../app.constants';
import { Observable, map, of } from 'rxjs';
import { Employee } from '../employee/employee.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticatedUser'
export const USER = 'employee'

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private employee: Employee | null = null;

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
            console.log('Employee verified: ', data)
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
            this.setEmployee(username);
            return data;
          }
        )
    );
  }
  
  setEmployee(username: string) {
    this.getUser(username).subscribe({
      next: data => {
        console.log('Employee set')
        this.employee = data
        sessionStorage.setItem(USER, JSON.stringify(data));
        
      }
    })
  }

  getEmployee(): Observable<Employee | null> {
    let employeeData = sessionStorage.getItem(USER);
    if (employeeData) {
      return of(JSON.parse(employeeData));
    }
    return of(null);
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
    if (!this.employee) {
      console.warn('Employee data is not available')
      return false;
    } else {
      return this.employee.admin
    }
  }

  getUser(username: string) {
    return this.http.get<Employee>(`${API_URL}/employee/${username}`)
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER)
    sessionStorage.removeItem(TOKEN)
    sessionStorage.removeItem(USER)
  }
}
