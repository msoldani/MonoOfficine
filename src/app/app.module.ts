import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { MonopattiniComponent } from './monopattini/monopattini.component';

import { AgmCoreModule } from '@agm/core';
import { Monopattino } from './map/monopattino.model';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MapComponent,
    MonopattiniComponent,
    MonopattiniComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyCzUI8LYmnHPyFrtRT8Q8IEREZfOygUl-U'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
