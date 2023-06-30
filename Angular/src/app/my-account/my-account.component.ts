import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee/employee.component';
import { AuthenticationService } from '../service/authentication.service';
import { AccountService } from '../service/data/account.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  username: string = '';
  employee: Employee = new Employee(0, '', '', '', '', false, false);
  userChanged: boolean = false
  changeUserWentWrong: boolean = false

  constructor(
    private authenticationService: AuthenticationService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.username = this.authenticationService.getAuthenticatedUser()!;
    console.log(this.username)

    this.authenticationService.getUser(this.username).subscribe({
      next: data => {
        console.log(data)
        this.employee = data;
      }
    })
    
  }

  changeAccountData() {
    console.log(this.employee)

    this.accountService.changeUser(this.employee).subscribe({
      next: data => {
        this.userChanged = true;
        this.changeUserWentWrong = false;
      },
      error: error => {
        this.changeUserWentWrong = true;
        this.userChanged = false;
      }
    })
  }
}
