import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _baseUrl = environment.domain;

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllTickets() {
    return this.httpClient.get<[]>(`${this._baseUrl}/admin/ticket`);
  }

  getMailWithCredentials(email: string) {
    return this.httpClient.get<any>(`${this._baseUrl}/${email}/forgotpassword`)
  }

  register(userData: any) {
    return this.httpClient.post<any>(`${this._baseUrl}/register`, userData)
  }

  getPdf(link: any) {
    return this.httpClient.get(link, { responseType: 'arraybuffer' })

  }

  getMyTickets() {
    return this.httpClient.get<[]>(`${this._baseUrl}/mytickets`);
  }

  raiseTicket(ticketData: any) {
    return this.httpClient.post<any>(`${this._baseUrl}/raiseticket`, ticketData)
  }

  editTicket(ticketData: any) {
    return this.httpClient.put<any>(`${this._baseUrl}/editTicket`, ticketData)
  }

  getTicketById(id: number) {
    return this.httpClient.get<any>(`${this._baseUrl}/ticket/${id}`)
  }
}
