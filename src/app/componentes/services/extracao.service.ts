import { ApostaService } from './aposta.service';
import { EnviromentUtil } from './../../util/enviroment-util';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Extracao } from '../../model/extracao.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExtracaoService {

  private isExtracao = new BehaviorSubject<boolean>(false);

  get isExtracaoIn() {
    return this.isExtracao.asObservable(); 
  }

  setExtracaoIn(isLogged: boolean) :void {
    this.isExtracao.next(isLogged);
  }


  api = EnviromentUtil.API;
  endpoint = this.api + '/api/extracoes/';

  constructor(
    private http: HttpClient,
    private apostaService: ApostaService
  ) { }

  listar(): Observable<Extracao[]> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + window.btoa(this.apostaService.credenciais.username + ":" + this.apostaService.credenciais.password) })
    return this.http.get<Extracao[]>(`${this.endpoint}`,{headers});
  }
}
