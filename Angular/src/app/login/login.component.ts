import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee/employee.component';
import { AuthenticationService } from '../service/authentication.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = 'marenthe@gmail.com'
  password: string = 'geheim'
  employee: Employee | null = null
  errorMessage = 'Ongeldig emailadres of wachtwoord'
  invalidLogin = false

  // Dependency Injection
  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
    private sidebarComponent: SidebarComponent
    ) {}

  handleJWTAuthLogin() {
    this.authenticationService.executeJWTAuthenticationService(this.username, this.password)
        .subscribe({
      next: () => {
        this.authenticationService.getEmployee().subscribe({
          next: data => { this.employee = data },
          error: error => { console.error('Loading employee failed: ', error) }
        })
        this.router.navigate(['library'])

        // this.router.navigate(['library', this.username]);
        this.invalidLogin = false;
        this.sidebarComponent.ngOnInit();
      },
      error: error => {
        console.log(error);
        this.invalidLogin = true;
      }
    })
  }

}
