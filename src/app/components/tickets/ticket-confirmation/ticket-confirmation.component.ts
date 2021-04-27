import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ticket-confirmation',
  templateUrl: './ticket-confirmation.component.html',
  styleUrls: ['./ticket-confirmation.component.scss']
})
export class TicketConfirmationComponent implements OnInit {

  historyState: any;

  constructor(
    public router: Router,
    private _http: UserService,
    private _snackBar: MatSnackBar
  ) { }

  loadData() {
    this.historyState = history.state;
  }


  onSubmit() {
    this._http.raiseTicket(this.historyState).subscribe(
      response => {
        this.openSnackBar("Thank You! Your Ticket has been raised Succesfully! We will start working on it soon.", "Ok")
        this.router.navigateByUrl('/ticket')
      },
      error => {
        console.log(error)
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnInit(): void {
    if (!history.state.requestType) {
      this.router.navigateByUrl("/raiseTicket")
    }
    this.loadData();
  }

}
