import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LibraryComponent } from './library/library.component';
import { LogoutComponent } from './logout/logout.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { ManageBooksComponent } from './manage-books/manage-books.component';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';
import { RouteGuardService } from './service/route-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate:[RouteGuardService], data: {requiresAdmin: false} },
  { path: 'library', component: LibraryComponent, canActivate:[RouteGuardService], data: {requiresAdmin: false} },
  { path: 'myAccount', component: MyAccountComponent, canActivate:[RouteGuardService], data: {requiresAdmin: false} },
  { path: 'myBookings', component: MyBookingsComponent, canActivate:[RouteGuardService], data: {requiresAdmin: false} },
  { path: 'manageBooks', component: ManageBooksComponent, canActivate:[RouteGuardService], data: {requiresAdmin: false} },
  { path: 'manageAccounts', component: ManageAccountsComponent, canActivate:[RouteGuardService], data: {requiresAdmin: false} },
  { path: 'manageBookings', component: ManageBookingsComponent, canActivate:[RouteGuardService], data: {requiresAdmin: false} },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
