import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { LibraryComponent } from './library/library.component';
import { LogoutComponent } from './logout/logout.component';
import { InterceptorAuthService } from './service/http/interceptor-auth.service';
import { EmployeeComponent } from './employee/employee.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { ManageBooksComponent } from './manage-books/manage-books.component';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SidebarComponent,
    MenuComponent,
    LoginComponent,
    LibraryComponent,
    LogoutComponent,
    EmployeeComponent,
    MyAccountComponent,
    MyBookingsComponent,
    ManageBooksComponent,
    ManageAccountsComponent,
    ManageBookingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorAuthService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
