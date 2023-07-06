import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Employee } from '../employee/employee.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {  
  employee: Employee |null = null;
  userLoggedIn: boolean | null = null;
  userAdmin: boolean | null = null;
  employeeDataLoaded = false;

  constructor(
    public authenticationService: AuthenticationService
  ) { }


  ngOnInit(): void {
    this.authenticationService.getEmployee().subscribe({
      next: (data) => {
        console.log('Employee loaded')
        this.employee = data;
        this.employeeDataLoaded = true;
        this.userLoggedIn = this.authenticationService.isUserLoggedIn();
        this.userAdmin = this.authenticationService.isUserAdmin();
      },
      error: () => {
        this.employeeDataLoaded = true;
        this.userLoggedIn = this.authenticationService.isUserLoggedIn();
        this.userAdmin = this.authenticationService.isUserAdmin();
        console.error('Something went wrong getting employee');
      },
    });
  }

  logoutEmployee() {
    this.employee = null;
  }

}
