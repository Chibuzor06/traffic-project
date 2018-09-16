import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  lineChart0: HTMLElement; lineChart1: HTMLElement;
  lineCanvas0; lineCanvas1;
  constructor() { }

  ngOnInit() {
    this.initCharts();
  }


  private initCharts() {
    this.lineCanvas0 = document.getElementById('lineChart0');
    this.lineChart0 = new Chart(this.lineCanvas0, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          label: 'Vehicle Count',
          data: [20, 10, 50, 100, 25, 76],
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
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          label: 'Average Vehicle Count per Hour',
          data: [12, 30, 3, 3, 13, 12],
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
}
