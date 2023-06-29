import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Employee } from '../employee/employee.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  username = 'Marenthe'
  
  constructor(
    public authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    
  }

}
