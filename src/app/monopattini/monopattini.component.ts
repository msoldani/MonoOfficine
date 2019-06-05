import { Component, OnInit, Input } from '@angular/core';
import { Noleggio } from './noleggio.model';

import { Monopattino } from '../map/monopattino.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guasto } from './guasto.model';



@Component({
  selector: 'app-monopattini',
  templateUrl: './monopattini.component.html',
  styleUrls: ['./monopattini.component.css']
})
export class MonopattiniComponent implements OnInit {
 inizio: boolean = true;
  @Input() _id:string;
 iniziato: boolean = true;
  fine: boolean = false;
  data: Object;
  o: Observable<Object>;
  nole: Observable<Noleggio[]>;
  noleggio: Array<Noleggio> = new Array();
  gua: Observable<Guasto[]>;
  guaSto: Array<Guasto> = new Array();
  user:string;
  userId:string;
  dataInizio: string;
  oraInizio:string;
  oraGuasto:string;
  dataGuasto:string;
  a:any;
  inizioNol=[];
  DataOra=[];
  mono: Observable<Monopattino[]>;
  monoPa: Monopattino[] = [];
  segnalareGuasto:boolean=false;
  cliccatoGuasto: boolean = true;
  guasto2:string="";
  err:string;
  time: number = 0;


  constructor(public http: HttpClient) {
      this.user = localStorage.getItem('username');
      this.userId = localStorage.getItem('idUser');

  }
  ngOnInit() {
  }

  open() {
    if(this.user !=null){
     this.cliccatoGuasto=false;
     this.segnalareGuasto=true
    }else{
      this.err = "Devi effettuare l'accesso prima!";
    }
  }
  close() {
     this.segnalareGuasto=false
     this.cliccatoGuasto=true
  }

  inizioNoleggio(): void {
    if(this.user != null){
          this.inizio = false;
          this.fine = true;
          this.iniziato = false;
          var data = new Date();
          console.log("Inizio noleggio: ", data.toLocaleString());
          var x =  data.toLocaleString().split(",");
          var date=x[0];
          var time=x[1];

          this.inizioNol.push(date,time);
          console.log(this.inizioNol)
    }else{
      this.err = "Devi effettuare l'accesso prima!";
    }



  }


  fineNoleggio(): void {
     this.fine = false;
     this.inizio = true;
     this.iniziato = true;
     var data = new Date();
     console.log("Fine noleggio: ", data.toLocaleString());
     var y = data.toLocaleString().split(",");
     var date2=y[0];
     var time2=y[1];


     this.oraInizio= this.inizioNol[1];
     this.dataInizio= this.inizioNol[0];


     this.user = localStorage.getItem('username');

     let dati: Noleggio = new Noleggio();
     dati.username = this.user;
     dati.dataInizio = this.dataInizio;
     dati.oraInizio = this.oraInizio;


     dati.dataFine = date2;
     dati.oraFine = time2;

     console.log(dati);
     this.noleggio.push(dati);
     console.log(this.noleggio);
     this.Noleggio(dati);
     }

   Noleggio(dati: Noleggio): void {
        console.log(dati.username);

     this.http.post('https://3000-e2613c08-eafa-4064-b000-c5cacf8d7c4c.ws-eu0.gitpod.io/noleggio', {User:dati.username,dataIn:dati.dataInizio, oraIn:dati.oraInizio, dataFi:dati.dataFine, oraFi:dati.oraFine})
      .subscribe(data => {
        this.data = data;
        console.log(this.data);
      });
   }

    segnala(problema: string): void {
      if(this.user != null){
        var data = new Date();
        console.log("Data segnalazione: ", data.toLocaleString());
        var y = data.toLocaleString().split(",");
        var date2=y[0];
        var time2=y[1];
        this.DataOra.push(date2,time2);
        this.oraGuasto= this.DataOra[1];
        this.dataGuasto= this.DataOra[0];


        let dati: Guasto = new Guasto();
        dati.idMonopattino = this._id;
        dati.idUser = this.userId;
        dati.problema = problema;
        dati.oraSegnalazione = this.oraGuasto;
        dati.dataSegnalazione = this.dataGuasto;
        console.log(dati);

        this.guaSto.push(dati);
        console.log(this.guaSto);
        this.Guasto(dati);
      }else{
         this.err = "Devi effettuare l'accesso prima!";
      }
   }

  Guasto(dati: Guasto): void {
     this.http.post('https://3000-e2613c08-eafa-4064-b000-c5cacf8d7c4c.ws-eu0.gitpod.io/guasto', {idMonopattino:dati.idMonopattino, problema:dati.problema, idUser:dati.idUser, DataSegn:dati.dataSegnalazione, OraSegn:dati.oraSegnalazione})
      .subscribe(data => {
        this.data = data;
        console.log(this.data);
      });
   }

}
