import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import {FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { HomeNewComponent } from './home-new/home-new.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { RealTimeMonitorComponent } from './real-time-monitor/real-time-monitor.component';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  {path : '', redirectTo: '/statistics', pathMatch: 'full'},
  {path: 'statistics', component: StatisticsComponent},
  {path : 'home', component: HomeComponent},
  {path : 'monitor', component: RealTimeMonitorComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    TopNavbarComponent,
    SideNavbarComponent,
    HomeNewComponent,
    StatisticsComponent,
    RealTimeMonitorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
