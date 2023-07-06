import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular';

  constructor( private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.executeJWTAuthenticationService('marenthe@gmail.com', 'geheim').subscribe({
      next: () => { console.log('Authentication succesful') },
      error: () => { console.error('Authentication failed') }
    })
  }
}
