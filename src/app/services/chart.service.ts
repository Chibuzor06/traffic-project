import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

// Pusher.logToConsole = true;

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private pusher;
  private channel;
  constructor() {
    this.pusher = new Pusher('1906c7198840d1ace56b', {
      cluster: 'eu'
    });
   }
   getLiveData(onDataGotten?: (message) => void) {
    this.channel = this.pusher.subscribe('traffic-channel');
    this.channel.bind('vehicle-detected-event', function(data) {
      if (onDataGotten) {
        onDataGotten(data);
      }
    });
   }
}
