import { Bilhete } from './../../model/bilhete.model';
import { Observable } from 'rxjs';
import { ApostaService } from './aposta.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnviromentUtil } from './../../util/enviroment-util';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BilheteService {


  api = EnviromentUtil.API;
  endpoint = this.api + '/api/bilhetes/';

  constructor(
    private http: HttpClient,
    private apostaService: ApostaService
  ) { }


  listar(): Observable<Bilhete[]> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + window.btoa(this.apostaService.credenciais.username + ":" + this.apostaService.credenciais.password) });
    const url = this.endpoint+this.apostaService.credenciais.username;
    return this.http.get<Bilhete[]>(`${url}`, {headers});
  }

  salvar(): Observable<Bilhete> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + window.btoa(this.apostaService.credenciais.username + ":" + this.apostaService.credenciais.password) });  
    return this.http.post<Bilhete>(`${this.endpoint}`, this.apostaService.bilhete, {headers});
  }


}
