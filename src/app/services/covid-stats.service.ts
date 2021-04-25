import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CovidStatsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getStats(country: any, priordate: any, today: any) {
    return this.httpClient.get<any[]>(`https://api.covid19api.com/country/${country}?from=${priordate}&to=${today}`)
      .pipe(map(result => result));
  }
}
