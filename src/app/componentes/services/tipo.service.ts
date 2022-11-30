import { ApostaService } from './aposta.service';
import { Tipo } from './../../model/tipo.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnviromentUtil } from './../../util/enviroment-util';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  api = EnviromentUtil.API;
  endpoint = this.api + '/api/tipos/';

  constructor(
    private http: HttpClient,
    private apostaService: ApostaService
  ) { }

  listar(): Observable<Tipo[]> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + window.btoa(this.apostaService.credenciais.username + ":" + this.apostaService.credenciais.password) })
    return this.http.get<Tipo[]>(`${this.endpoint}`, {headers});
  }

}
