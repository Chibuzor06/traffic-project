/// <reference types="@types/googlemaps" />
import { Component, OnInit, AfterViewInit, ViewChild, ApplicationRef } from '@angular/core';
import { Chart } from 'chart.js';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit, AfterViewInit {
  lineChart0: any; lineChart1: any;
  lineCanvas0; lineCanvas1;
  autocomplete: google.maps.places.Autocomplete;
  street: {address: string, placeId: string};
  baseUrl = 'http://localhost:8081/finalyearproj/api/getTrafficAnalysis';
  @ViewChild('streetInput') inputElement: any;
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];
  showAnalysis = true;
  test = true;
  averageDailyTraffic;
  maxVehiclesInAnHour;
  peakTimeOfTrafficFlow;

  constructor(private http: HttpClient, private appRef: ApplicationRef) { }

  ngOnInit() {
    this.initCharts();
  }
  ngAfterViewInit(): void {
    // Load googlel maps script after view init
    try {
      this.initStreetAutocomplete();
    } catch (e) {
      if (e instanceof ReferenceError) {
        console.log('statistics reference error  catch');
        const DSLScript = document.createElement('script');
        DSLScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDbv4M_18hTKH7mDohM8omkQAJxsdoJ6_M&libraries=places';
        DSLScript.type = 'text/javascript';
        DSLScript.defer = true;
        document.body.appendChild(DSLScript);
        DSLScript.onload = this.initStreetAutocomplete;
        document.body.removeChild(DSLScript);
      }
    }
  }
  initStreetAutocomplete = () => {
    const options = {
      types: ['geocode'],
      componentRestrictions: {country: 'ng'},
      fields: ['geometry', 'formatted_address', 'place_id']
    };

    this.autocomplete = new google.maps.places.Autocomplete(this.inputElement.nativeElement, options);
    // this.autocomplete.bindTo('bounds', this.map);
    this.autocomplete.addListener('place_changed', this.getStreetChosen);
  }

  getStreetChosen = () => {
    const street = this.autocomplete.getPlace();
    // console.log(street);
    this.street = {address: street.formatted_address, placeId: street.place_id};
    this.appRef.tick();
  }

  initCharts() {
    // labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    // data: [20, 10, 50, 100, 25, 76]
    // data: [12, 30, 3, 3, 13, 12],
    this.lineCanvas0 = document.getElementById('lineChart0');
    this.lineChart0 = new Chart(this.lineCanvas0, {
      type: 'line',
      data: {
        labels: (this.test ? ['January', 'February', 'March', 'April', 'May', 'June'] : []),
        datasets: [{
          label: 'Vehicle Volume',
          data: (this.test ? [20, 10, 50, 100, 25, 76] : []),
          borderColor: '#3cba9f',
          backgroundColor: '#3cba9f',
          fill: false
        }]
      },
      options: {
        elements: {
          line: {
            tension: 0,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });

    this.lineCanvas1 = document.getElementById('lineChart1');
    this.lineChart1 = new Chart(this.lineCanvas1, {
      type: 'line',
      data: {
        labels: (this.test ? ['January', 'February', 'March', 'April', 'May', 'June'] : []),
        datasets: [{
          label: 'Average Vehicle Volume per Hour',
          data: (this.test ? [12, 30, 3, 3, 13, 12] : []),
          borderColor: '#e0868d',
          backgroundColor: '#e0868d',
          fill: false
        }]
      },
      options: {
        elements: {
          line: {
            tension: 0,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  onFilterCharts(form: NgForm) {
    console.log(form.value);
    const formValues = form.value;
    const start = new Date (formValues.startDate);
    const end = formValues.endDate ? new Date(formValues.endDate) : new Date();
    const url = `${this.baseUrl}?trafficEntry.streetID=${this.test ? 'testStreetId' : this.street.placeId}&startDate=${start.toISOString()}
      &endDate=${end.toISOString()}`;
    console.log(url);
    this.http.get(url).subscribe(
      (response: any) => {
        console.log('response: ', response);
        window.scrollTo(0, document.body.scrollHeight);
        const monthNames = this.generateMonthNames(start, end);
        console.log(monthNames);
        this.updateCharts(response.vehicleVolumePerMonth, response.monthlyAverageVehicleVolumePerHour, monthNames);
        this.averageDailyTraffic = response.averageDailyTraffic;
        this.maxVehiclesInAnHour = response.maxVehiclesInAnHour;
        this.peakTimeOfTrafficFlow = response.peakTimeOfTrafficFlow;
      },
      err => {
        console.log(err);
      }
    );
  }
  generateMonthNames(start: Date, end: Date): string[] {
    const monthNames = [];
    for (let i = start.getMonth(); i < end.getMonth() + 1; i++) {
      monthNames.push(this.months[i]);
    }
    return monthNames;
  }
  updateCharts(lineChartValues0, lineChartValues1, monthNames: string[]) {
    this.lineChart0.data.datasets[0].data = lineChartValues0.slice();
    this.lineChart1.data.datasets[0].data = lineChartValues1.slice();
    this.lineChart0.data.labels = monthNames.slice();
    this.lineChart1.data.labels = monthNames.slice();
    this.lineChart0.update();
    this.lineChart1.update();
  }
}
