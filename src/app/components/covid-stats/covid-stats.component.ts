import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CovidStatsService } from 'src/app/services/covid-stats.service';
import { Chart } from 'chart.js';
import * as countriesData from 'src/assets/countries.json';


@Component({
  selector: 'app-covid-stats',
  templateUrl: './covid-stats.component.html',
  styleUrls: ['./covid-stats.component.scss']
})
export class CovidStatsComponent implements OnInit {

  @ViewChild('myCanvas') myCanvas: ElementRef | undefined;
  public context: CanvasRenderingContext2D | undefined;
  country = '';
  chart: any;
  countries = countriesData.countries;


  constructor(
    private _service: CovidStatsService
  ) { }

  drawGraph(): void {

    this._service
      .getStats(this.formatCountry(), this.priorDate(), this.todaysDate())
      .subscribe((res) => {
        console.log(res);
        let dates = res.map((res) => String(res.Date).substring(0, 10));
        let uniquedates = [...new Set(dates)];
        // let activeCases = res.map(res=> this.activeCases(res.Confirmed,res.Deaths,res.Recovered) )
        let recovered = res.map((res) => res.Recovered);
        let deaths = res.map((res) => res.Deaths);
        let confirmed = res.map((res) => res.Confirmed);
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: uniquedates,
            datasets: [
              { data: deaths, borderColor: 'black', fill: false, label: 'Deaths', },
              { data: recovered, borderColor: 'green', fill: false, label: 'Recovered', },
              { data: confirmed, borderColor: 'red', fill: false, label: 'Confirmed', },
            ],
          },
          options: {
            legend: { display: true, },
            maintainAspectRatio: false,
            responsive: true,
            scales: { xAxes: [{ display: true, },], yAxes: [{ display: true, },], },
          },
        });
      });

    if (this.chart != null) {
      this.chart.destroy();
    }

  }

  formatCountry() {
    let fcountry = '';
    if (this.country.indexOf(' ') >= 0) {
      fcountry = this.country.split(' ').join('-');
      return fcountry;
    }
    return this.country;
  }

  todaysDate() {
    var formattedDate: Date = new Date();
    var dd: number;
    if (formattedDate.getDate() - 1 == 0) {
      dd = 1;
    } else {
      dd = formattedDate.getDate() - 1;
    }

    let date: String;
    let month: String;

    var mm = formattedDate.getMonth() + 1;
    var yyyy = formattedDate.getFullYear();
    if (dd < 10) {
      date = '0'.concat(dd.toString());
    } else {
      date = dd.toString();
    }

    if (mm < 10) {
      month = '0'.concat(mm.toString());
    }
    let todayDate = yyyy + '-' + month! + '-' + date + 'T00:00:00Z';

    return todayDate;
  }

  priorDate() {
    var date = new Date();
    date.setDate(date.getDate() - 30);
    var dateString = date.toISOString().split('T')[0];
    var pDate = dateString + 'T00:00:00Z';

    return pDate;
  }

  ngOnInit(): void {
  }

}
