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

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'myAccount', component: MyAccountComponent },
  { path: 'myBookings', component: MyBookingsComponent },
  { path: 'manageBooks', component: ManageBooksComponent },
  { path: 'manageAccounts', component: ManageAccountsComponent },
  { path: 'manageBookings', component: ManageBookingsComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
