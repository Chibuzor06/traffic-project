/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
// import {  } from '@types/googlemaps';

@Component({
  selector: 'app-real-time-monitor',
  templateUrl: './real-time-monitor.component.html',
  styleUrls: ['./real-time-monitor.component.css']
})
export class RealTimeMonitorComponent implements OnInit, AfterViewInit {
  @ViewChild('gmap') gmapElement: any;
  @ViewChild('input') inputElement: any;
  map: google.maps.Map;
  autocomplete: google.maps.places.Autocomplete;
  initMap = () => {
  const mapProp = {
    center: new google.maps.LatLng(6.5149, 3.38586),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  const card = document.getElementById('pac-card');
  // let input = document.getElementById('pac-input');
  this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

  this.autocomplete = new google.maps.places.Autocomplete(this.inputElement.nativeElement);
  this.autocomplete.bindTo('bounds', this.map);
}


  constructor() { }

  ngOnInit() {
    // this.initMap();
  }

  ngAfterViewInit(): void {
    // Load googlel maps script after view init
    try {
      this.initMap();
    } catch (e) {
      if (e instanceof ReferenceError) {
        console.log('reference error catch');
        const DSLScript = document.createElement('script');
        DSLScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDbv4M_18hTKH7mDohM8omkQAJxsdoJ6_M';
        DSLScript.type = 'text/javascript';
        document.body.appendChild(DSLScript);
        DSLScript.onload = this.initMap;
        document.body.removeChild(DSLScript);
      }
    }
  }


}
