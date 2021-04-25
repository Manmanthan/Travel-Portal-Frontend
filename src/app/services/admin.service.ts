import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  _baseUrl = environment.domain;

  constructor(
    private httpClient: HttpClient
  ) { }

  getEmployees() {
    return this.httpClient.get<Employee[]>(`${this._baseUrl}/employees`);
  }

  getAllTickets() {
    return this.httpClient.get<[]>(`${this._baseUrl}/admin/ticket`);
  }

  uploadFormDetails(formData: FormData) {
    //form data
    return this.httpClient.post<any>(`${this._baseUrl}/admin/ticket/update`, formData);
  }

  getPdf(link: any) {
    return this.httpClient.get(link, { responseType: 'arraybuffer' });

  }

  getTicketById(id: number) {
    return this.httpClient.get<any>(`${this._baseUrl}/admin/ticket/${id}`);
  }
}
