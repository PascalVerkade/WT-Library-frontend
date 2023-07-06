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
  employee: Employee | null = null;
  userChanged: boolean = false;
  changeUserWentWrong: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.authenticationService.getEmployee().subscribe({
      next: data => { this.employee = data },
      error: error => { console.error('Loading employee failed: ', error) }
    })
  }

  changeAccountData() {
    console.log(this.employee)
    
    if (!this.employee) {
      console.warn('Employee data is not available')
    } else {
      this.accountService.changeUser(this.employee).subscribe({
        next: () => {
          this.userChanged = true;
          this.changeUserWentWrong = false;
        },
        error: () => {
          this.changeUserWentWrong = true;
          this.userChanged = false;
        }
      })
    }
  }
}
