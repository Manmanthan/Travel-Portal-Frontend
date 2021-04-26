import { Component, OnInit } from '@angular/core';
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
  ) { }

  loadData() {
    this.historyState = history.state;
  }


  onSubmit() {
    this._http.raiseTicket(this.historyState).subscribe(
      response => {
        alert("Thank You! Your Ticket has been raised Succesfully! We will start working on it soon.")
        this.router.navigateByUrl('/ticket')
      },
      error => {
        console.log(error)
      }
    );
  }

  ngOnInit(): void {
    if (!history.state.requestType) {
      this.router.navigateByUrl("/raiseTicket")
    }
    this.loadData();
  }

}
