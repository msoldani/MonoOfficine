import { Component, OnInit } from '@angular/core';
import { Login } from './login.model';
import { Registrazione } from './registrazione.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data: Object;
  o: Observable<Object>;
  obsLogin: Observable<Login[]>;
  obsRegistra: Observable<Login[]>;
  loginArray: Array<Login> = new Array();
  registraArray: Array<Registrazione> = new Array();
  err: String = "";

  constructor(public http: HttpClient,private router: Router) { }

  ngOnInit() {
  }

   login(username: string, password: string): boolean {
    let dati: Login = new Login();
    dati.username = username;
    dati.password = password;
    this.loginArray.push(dati);
    this.Accedi(dati);
    console.log(dati);
    return false;
  }

  Accedi(dati: Login): void {
    this.http.get<Object>('https://3000-e2613c08-eafa-4064-b000-c5cacf8d7c4c.ws-eu0.gitpod.io/login/' + dati.username + '/' + dati.password)
      .subscribe(data => {

        var a: any;
        a = data;
        console.log(a.result);

        this.data = data;
        if (a.result != "Errore") {
          this.router.navigate(['/home']);
        }else{
          this.err ="Username o password errati"
        }
        console.log(this.data);
        var id=a.result._id;
        var username=a.result.username;
        console.log(id);
        console.log(username);
        localStorage.setItem('username', username);
        localStorage.setItem('idUser', id);
      });
  }

registra(username1: string, password1: string): boolean {

    let dati2: Registrazione = new Registrazione();
    dati2.username1 = username1;
    dati2.password1 = password1;
    this.registraArray.push(dati2);
    this.Registra(dati2);
    console.log(dati2);
    return false;
  }

  Registra(dati2: Registrazione): void {
    console.log(dati2);
    this.http.post('https://3000-e2613c08-eafa-4064-b000-c5cacf8d7c4c.ws-eu0.gitpod.io/registrazione', { username: dati2.username1, password: dati2.password1 })
      .subscribe(data => {
        this.data = data;
        console.log(this.data);
      });
  }
}
