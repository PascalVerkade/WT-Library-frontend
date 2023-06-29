import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee/employee.component';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = 'marenthe@gmail.com'
  password: string = 'geheim'
  employee: Employee = new Employee(0, '', '', '', '', false, false)
  errorMessage = 'Ongeldig emailadres of wachtwoord'
  invalidLogin = false

  // Dependency Injection
  constructor(
    private router: Router,
    public authenticationService: AuthenticationService
    ) {}

  handleJWTAuthLogin() {
    this.authenticationService.executeJWTAuthenticationService(this.username, this.password)
        .subscribe({
      next: data => {
        this.employee = new Employee(0, '', '', '', '', false, false)

        this.authenticationService.getUser(this.username).subscribe({
          next: data=> {
            this.employee = data;
          }
        });


        this.router.navigate(['library'])
        // this.router.navigate(['library', this.username]);
        this.invalidLogin = false;
      },
      error: error => {
        console.log(error);
        this.invalidLogin = true;
      }
    })
  }

}
