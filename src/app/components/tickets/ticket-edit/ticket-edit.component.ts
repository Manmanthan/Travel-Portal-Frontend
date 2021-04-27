import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.scss']
})
export class TicketEditComponent implements OnInit {

  oldData: any;
  minDate: Date | undefined;
  editTicketForm: any;
  cities = [
    { city: 'Vardenis' },
    { city: 'Martuni' },
    { city: 'Paris' },
    { city: 'Dijon' },
    { city: 'Berlin' },
    { city: 'Munich' },
    { city: 'Potsdam' },
    { city: 'Indore' },
    { city: 'Pune' },
    { city: 'New Delhi' },
    { city: 'Banglore' },
    { city: 'Jaipur' },
    { city: 'Tokya' },
    { city: 'Osava' },
    { city: 'Toyota' },
    { city: 'Amsterdam' },
    { city: 'Harlem' },
    { city: 'London' },
    { city: 'Liverpool' },
    { city: 'Manchester' },
    { city: 'Atlanta' },
    { city: 'Virginia' },
    { city: 'Jersey City' },
  ];

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private _http: UserService,
    private _snackBar: MatSnackBar
  ) {
    this.minDate = new Date();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnInit(): void {
    if (history.state.state == null) {
      this.router.navigateByUrl("/ticket")
    }
    this.oldData = history.state.state;
    this.populateForm();
  }

  onFormSubmit() {
    this._http.editTicket(this.editTicketForm.value).subscribe(
      response => {
        this.openSnackBar("Thank You! Your Ticket has been Edited Succesfully! We will start working on it soon.", "Ok");
        this.router.navigateByUrl('/ticket');
      },
      error => {
        console.log(error);
      }
    );
  }

  populateForm() {
    this.oldData = history.state.state;
    this.editTicketForm = this.fb.group({
      ticketId: [this.oldData.ticketId],
      requestType: [this.oldData.requestType, Validators.required],
      priority: [this.oldData.priority, Validators.required],
      from: [this.oldData.from, Validators.required],
      travelCity: [this.oldData.travelCity, Validators.required],
      startDate: [this.oldData.startDate, Validators.required],
      endDate: [this.oldData.endDate, Validators.required],
      passportNumber: [this.oldData.passportNumber, [Validators.required, Validators.maxLength(25)]],
      projectName: [this.oldData.projectName, [Validators.required, Validators.maxLength(100)]],
      borneBy: [this.oldData.borneBy, Validators.required],
      approver: [this.oldData.approver, [Validators.maxLength(100)]],
      expectedDuration: [this.oldData.expectedDuration, Validators.maxLength(100)],
      allowedAmount: [this.oldData.allowedAmount, Validators.maxLength(500)],
      extraDetails: [this.oldData.expectedDuration, Validators.maxLength(1000)],
      submitDate: [new Date()],
      status: ['Resubmitted'],
      remarks: [this.oldData.remarks],
      downloadLink: [this.oldData.downloadLink],
      files: [this.oldData.files]

    });
  }

  goBack() {
    this.router.navigateByUrl(`/ticketDetail/${this.oldData.ticketId}`, { state: this.oldData })
  }

}
