import { Component, OnInit } from '@angular/core';
import { Coordinate } from './coordinate.model';
import { Monopattino } from './monopattino.model';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat = 45.4654219;
  lng = 9.1859243;
  o: Observable<Object>;
  mono: Observable<Monopattino[]>;
  monoPa: Monopattino[] = [];
  user:string;
  constructor(public http: HttpClient) {
    this.findMe();
    this.invioPosizione();
    this.user = localStorage.getItem('username');
  }

  ngOnInit() {
  }

  findMe() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      console.log("Coordinate: " + this.lat + ", " + this.lng);
    });
  }

  invioPosizione(): void {
    this.mono = this.http.get<Monopattino[]>('https://3000-e2613c08-eafa-4064-b000-c5cacf8d7c4c.ws-eu0.gitpod.io/coordinate');
    this.mono.subscribe(data => {
      this.monoPa = data;
      console.log(data);
    });
  }
  icon={
    url:"./assets/img/1.png",
    scaledSize:{
      width:60,
      height:60
    }
  }
  icona={
    url:"./assets/img/logo.png",
    scaledSize:{
      width:60,
      height:70
    }
  }
}

