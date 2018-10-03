/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, AfterViewInit, ApplicationRef, OnDestroy } from '@angular/core';
import { ChartService } from '../services/chart.service';
import Chart from 'chart.js';
// import {  } from '@types/googlemaps';

@Component({
  selector: 'app-real-time-monitor',
  templateUrl: './real-time-monitor.component.html',
  styleUrls: ['./real-time-monitor.component.css']
})
export class RealTimeMonitorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('gmap') gmapElement: any;
  @ViewChild('input') inputElement: any;
  @ViewChild('barChart') chartElement: any;
  map: google.maps.Map;
  autocomplete: google.maps.places.Autocomplete;
  trafficLayer: google.maps.TrafficLayer;
  street: {address: string};

  lineChart: any;
  activity: number[] = [];
  vehicleCount;
  monitorStartTime;
  testMode = true;
  monitoring = false;

  intervalVal: any;
  initMap = () => {
    const mapProp = {
      center: new google.maps.LatLng(6.5149, 3.38586),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    const card = document.getElementById('pac-card');
    // let input = document.getElementById('pac-input');
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
    const options = {
      types: ['geocode'],
      componentRestrictions: {country: 'ng'},
      fields: ['geometry', 'formatted_address']
    };

    this.autocomplete = new google.maps.places.Autocomplete(this.inputElement.nativeElement, options);
    this.autocomplete.bindTo('bounds', this.map);
    this.autocomplete.addListener('place_changed', this.getStreetCoords.bind(this));
    this.trafficLayer = new google.maps.TrafficLayer();
  }

  constructor(private chartService: ChartService, private appRef: ApplicationRef) { }

  ngOnInit() {
    // this.chartService.getRealTimeData();
    this.initChart();
  }

  ngAfterViewInit(): void {
    // Load googlel maps script after view init
    try {
      this.initMap();
    } catch (e) {
      if (e instanceof ReferenceError) {
        console.log('reference error catch');
        const DSLScript = document.createElement('script');
        DSLScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDbv4M_18hTKH7mDohM8omkQAJxsdoJ6_M&libraries=places';
        DSLScript.type = 'text/javascript';
        DSLScript.defer = true;
        document.body.appendChild(DSLScript);
        DSLScript.onload = this.initMap;
        document.body.removeChild(DSLScript);
      }
    }
  }

  toggleLiveData() {
    this.testMode = !this.testMode;
    this.resetChartData();
    this.beginRealTimeMonitoring(this.testMode);
  }

  ngOnDestroy() {
    this.clearIntrvl();
  }
  clearIntrvl() {
    if (this.intervalVal && this.intervalVal !== NaN) {
      clearInterval(this.intervalVal);
      this.intervalVal = null;
    }
  }
  getStreetCoords() {
    this.trafficLayer.setMap(this.map);
    const street = this.autocomplete.getPlace();
    this.street = {address: street.formatted_address};
    console.log(street);
    if (street.geometry.viewport) {
      this.map.fitBounds(street.geometry.viewport);
    } else {
      this.map.setCenter(street.geometry.location);
    }
    this.resetChartData();
    this.appRef.tick();
    this.beginRealTimeMonitoring(this.testMode);
  }
  initChart() {
    this.lineChart = new Chart(this.chartElement.nativeElement, {
      type: 'line',
      data: {
        labels: [new Date().toLocaleTimeString()],
        datasets: [{
          label: 'Vehicle Count',
          data: [0],
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
            labelString: 'Vehicle Number',
            display: true,
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
        responsive: false,
        maintainAspectRatio: false
      }
    });
  }
  updateChart() {
    if (this.lineChart.data.labels.length > 10) {
      this.lineChart.data.labels.shift();
      this.lineChart.data.datasets[0].data.shift();
    }
    this.lineChart.data.labels.push(new Date().toLocaleTimeString());
    this.vehicleCount += this.activity.length;
    this.lineChart.data.datasets[0].data.push(this.activity.length);
    this.lineChart.update();
    this.activity = [];
    this.appRef.tick();
  }
  resetChartData() {
    this.clearIntrvl();

    this.lineChart.data.labels = [];
    this.lineChart.data.datasets[0].data = [];
    this.lineChart.data.labels.push(new Date().toLocaleTimeString());
    this.lineChart.data.datasets[0].data.push(0);
    this.lineChart.update();
    this.vehicleCount = null;
    this.monitorStartTime = null;
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  beginRealTimeMonitoring(testMode: boolean) {
    this.monitoring = true;
    this.monitorStartTime = new Date().toLocaleTimeString();
    if (!testMode) {
      this.chartService.getLiveData((data) => {
        this.activity.push(1);
      });
      this.intervalVal = setInterval(() => {
        this.updateChart();
      }, 3000);
    } else {
      this.intervalVal = setInterval(() => {
        const val = this.getRndInteger(0, 3);
        for (let i = 0; i < val; i++) {
          this.activity.push(1);
        }
        this.updateChart();
      }, 3000);
    }
  }
  stopMonitoring() {
    this.monitoring = false;
    this.resetChartData();
  }
}
