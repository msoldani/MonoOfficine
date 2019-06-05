import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Mono-Rent';
  user:string;
  vuoto: boolean = true;
  pieno: boolean = false;
  constructor(public http: HttpClient,private router: Router) {
    this.user = localStorage.getItem('username');
    if (this.user != null){
      this.vuoto = false;
      this.pieno = true;
    }else if (this.user == null){
      this.vuoto = true;
      this.pieno = false;
    }
  }

  ngOnInit() {
  }

  logout():void{
    this.user="";
    console.log("logout" + this.user);
    localStorage.clear();
    this.router.navigate(['/login']);
  }







}
