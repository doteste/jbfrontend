import { ApostaService } from './aposta.service';
import { PremiacaoCalculoDTO } from '../../model/premiacaocalculo.dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { EnviromentUtil } from './../../util/enviroment-util';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PremiacaoService {

  api = EnviromentUtil.API;
  endpoint = this.api + '/api/premiacao';

  constructor(private http: HttpClient,
    private apostaService: ApostaService) { }


  calcular(premio: PremiacaoCalculoDTO): Observable<number> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + window.btoa(this.apostaService.credenciais.username + ":" + this.apostaService.credenciais.password) })
    return this.http.post<number>(`${this.endpoint}`, premio, {headers});
  }


}
