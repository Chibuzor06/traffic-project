import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import {FormsModule } from '@angular/forms';
import { HomeNewComponent } from './home-new/home-new.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { RealTimeMonitorComponent } from './real-time-monitor/real-time-monitor.component';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  {path : '', redirectTo: '/statistics', pathMatch: 'full'},
  {path: 'statistics', component: StatisticsComponent},
  {path : 'monitor', component: RealTimeMonitorComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeNewComponent,
    StatisticsComponent,
    RealTimeMonitorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
