import { PagamentoPagSeguro } from './../../model/pagamentopagseguro';
import { PagamentoResponse } from './../../model/pagamentoresponse';
import { Bilhete } from './../../model/bilhete.model';
import { Observable } from 'rxjs';
import { ApostaService } from './aposta.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { EnviromentUtil } from './../../util/enviroment-util';

@Injectable({
    providedIn: 'root'
  })
export class PagamentoService {

  api = EnviromentUtil.API;
  endpoint = this.api + '/api/pagamento/';

  constructor(
    private http: HttpClient,
    private apostaService: ApostaService
  ) { }

  getCodCheckout(): Observable<string> {
    const url = `${this.endpoint}checkout`;
    const headers = new HttpHeaders({ Authorization: 'Basic ' + window.btoa(this.apostaService.credenciais.username + ":" + this.apostaService.credenciais.password) })
    return this.http.post<string>(url, this.apostaService.bilhete, {headers});
  }

  efetuarPagamento(pagamento: PagamentoPagSeguro): Observable<PagamentoResponse> {
    const url = `${this.endpoint}efetuarPagamento`;
    const headers = new HttpHeaders({ Authorization: 'Basic ' + window.btoa(this.apostaService.credenciais.username + ":" + this.apostaService.credenciais.password) })
    return this.http.post<PagamentoResponse>(url, pagamento, {headers})
  }

}