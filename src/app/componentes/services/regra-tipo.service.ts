import { ApostaService } from './aposta.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnviromentUtil } from './../../util/enviroment-util';
import { Injectable } from '@angular/core';
import { RegraTipo } from 'src/app/model/regratipo.model';

@Injectable({
  providedIn: 'root'
})
export class RegraTipoService {

  api = EnviromentUtil.API;
  endpoint = this.api + '/api/regra-tipo/';

  constructor(
    private http: HttpClient,
    private apostaService: ApostaService
  ) { }


  getRegra(idTipo: number): Observable<RegraTipo> {
    const url = `${this.endpoint}${idTipo}`;
    const headers = new HttpHeaders({ Authorization: 'Basic ' + window.btoa(this.apostaService.credenciais.username + ":" + this.apostaService.credenciais.password) })
    return this.http.get<RegraTipo>(url, {headers});
  }

}
