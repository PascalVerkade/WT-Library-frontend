import { AfterContentInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit, AfterContentInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.authenticationService.logout();
    }, 0);
  }

  ngAfterContentInit(): void {
    this.cdr.detectChanges();
    this.router.navigate(['login']);
  }

}
