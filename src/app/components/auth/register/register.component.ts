import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as statesData from 'src/assets/states.json';
import * as countriesData from 'src/assets/countries.json';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  emailRegx = '^[a-zA-Z0-9._%+-]+@nagarro.com$';
  selectedCountryId: any;
  states = statesData.states;
  filteredStates: any;
  countries = countriesData.countries;
  regiForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    businessUnit: ['', Validators.required],
    title: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
    phone: [
      '',
      [
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern('^(0|[1-9][0-9]*)$'),
      ],
    ],
    address1: ['', Validators.required],
    address2: [''],
    city: ['', Validators.required],
    zip: ['', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]],
    state: ['', Validators.required],
    country: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    public router: Router
  ) { }

  ngOnInit(): void {
    if (history.state.state) {
      this.populateForm();
    }
  }

  setCountry(countryName: any) {
    this.selectedCountryId = this.countries.find(x => x.name === countryName)?.id
    this.filteredStates = this.states.filter(x => x.country_id === this.selectedCountryId);
  }

  populateForm() {
    let data = history.state.state;
    this.regiForm.setValue({
      firstName: data.firstName,
      lastName: data.lastName,
      businessUnit: data.businessUnit,
      title: data.title,
      email: data.email,
      phone: data.phone,
      address1: data.address1,
      address2: data.address2,
      city: data.city,
      zip: data.zip,
      state: data.state,
      country: data.country,
    });
  }

  onFormSubmit() {
    this.router.navigateByUrl('/confirm', { state: this.regiForm.value });
  }

}
