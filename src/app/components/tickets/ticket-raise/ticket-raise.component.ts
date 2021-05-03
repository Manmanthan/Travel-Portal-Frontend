import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ticket-raise',
  templateUrl: './ticket-raise.component.html',
  styleUrls: ['./ticket-raise.component.scss']
})
export class TicketRaiseComponent implements OnInit {

  todayDate = new Date();
  minDate = new Date();
  breakpoint: any;
  addTicketForm = this.fb.group({
    requestType: ['', Validators.required],
    priority: ['', Validators.required],
    from: ['', Validators.required],
    travelCity: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    passportNumber: ['', [Validators.required, Validators.maxLength(25)]],
    projectName: ['', [Validators.required, Validators.maxLength(100)]],
    borneBy: ['', Validators.required],
    approver: ['', [Validators.maxLength(100)]],
    expectedDuration: ['', Validators.maxLength(100)],
    allowedAmount: ['', Validators.maxLength(500)],
    extraDetails: ['', Validators.maxLength(1000)],
  });
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
    private _http: UserService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 850) ? 1 : 2;
    if (history.state.state) {
      this.populateForm();
    }
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 850) ? 1 : 2;
  }

  populateForm() {
    let data = history.state.state;
    this.addTicketForm.setValue({
      requestType: data.requestType,
      priority: data.priority,
      from: data.from,
      travelCity: data.travelCity,
      startDate: data.startDate,
      endDate: data.endDate,
      passportNumber: data.passportNumber,
      projectName: data.projectName,
      borneBy: data.borneBy,
      approver: data.approver,
      expectedDuration: data.expectedDuration,
      allowedAmount: data.allowedAmount,
      extraDetails: data.extraDetails
    })
  }

  onFormSubmit(): void {
    this.router.navigateByUrl('/confirmTicket', {
      state: this.addTicketForm.value,
    });
  }

}
