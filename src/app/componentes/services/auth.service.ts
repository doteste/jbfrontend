import { ICredenciais } from './../../model/credenciais';
import { UsuarioDTO } from '../../model/usuario.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EnviromentUtil } from '../../util/enviroment-util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable(); 
  }

  setLoggedIn(isLogged: boolean) :void {
    this.loggedIn.next(isLogged);
  }

  api = EnviromentUtil.API;
  endpoint = this.api + '/api/login/';

  constructor(private http: HttpClient,
    private router: Router) { }

  login(credenciais: ICredenciais): Observable<UsuarioDTO> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + window.btoa(credenciais.username + ":" + credenciais.password) });
    const url = this.endpoint + credenciais.username;
    return this.http.get<UsuarioDTO>(`${url}`, { headers, responseType: 'text' as 'json' });
  }

  logout() {                          
    this.loggedIn.next(false);
    this.router.navigate(['/aposta/login']);
  }

}
