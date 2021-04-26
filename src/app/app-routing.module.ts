import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { RegisterConfirmComponent } from './components/auth/register/register-confirm/register-confirm.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TicketConfirmationComponent } from './components/tickets/ticket-confirmation/ticket-confirmation.component';
import { TicketDetailsComponent } from './components/tickets/ticket-details/ticket-details.component';
import { TicketEditComponent } from './components/tickets/ticket-edit/ticket-edit.component';
import { TicketRaiseComponent } from './components/tickets/ticket-raise/ticket-raise.component';
import { TicketUpdateAdminComponent } from './components/tickets/ticket-update-admin/ticket-update-admin.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: "", component: AuthComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'register', component: RegisterComponent, },
  { path: 'confirm', component: RegisterConfirmComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'ticket', component: TicketsComponent, canActivate: [AuthGuard] },
  { path: 'ticketDetail/:id', component: TicketDetailsComponent, canActivate: [AuthGuard] },
  { path: 'editTicket', component: TicketEditComponent },
  { path: 'admin/update', component: TicketUpdateAdminComponent },
  { path: 'raiseTicket', component: TicketRaiseComponent, canActivate: [AuthGuard] },
  { path: 'confirmTicket', component: TicketConfirmationComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
