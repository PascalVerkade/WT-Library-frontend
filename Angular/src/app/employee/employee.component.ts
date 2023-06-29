import { Component } from '@angular/core';

export class Employee {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public active: boolean,
    public admin: boolean
  ) { }
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

}
