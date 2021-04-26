import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthComponent } from './components/auth/auth.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { TicketDetailsComponent } from './components/tickets/ticket-details/ticket-details.component';
import { TicketConfirmationComponent } from './components/tickets/ticket-confirmation/ticket-confirmation.component';
import { TicketEditComponent } from './components/tickets/ticket-edit/ticket-edit.component';
import { TicketUpdateAdminComponent } from './components/tickets/ticket-update-admin/ticket-update-admin.component';
import { TicketRaiseComponent } from './components/tickets/ticket-raise/ticket-raise.component';
import { NgxPrintModule } from 'ngx-print';
import { RegisterComponent } from './components/auth/register/register.component';
import { RegisterConfirmComponent } from './components/auth/register/register-confirm/register-confirm.component';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    AuthComponent,
    LogoutComponent,
    ForgotPasswordComponent,
    TicketsComponent,
    TicketDetailsComponent,
    TicketConfirmationComponent,
    TicketEditComponent,
    TicketUpdateAdminComponent,
    TicketRaiseComponent,
    RegisterComponent,
    RegisterConfirmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    NgxPrintModule,
    MatNativeDateModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
