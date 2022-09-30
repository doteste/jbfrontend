import { Observable } from 'rxjs';
import { UsuarioDTO } from './../../model/usuario.dto';
import { EnviromentUtil } from './../../util/enviroment-util';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  api = EnviromentUtil.API;
  endpoint = this.api + '/api/usuario/';

  constructor(
    private http: HttpClient
  ) { }

  salvar(dto: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(this.endpoint, dto);
  }
}
