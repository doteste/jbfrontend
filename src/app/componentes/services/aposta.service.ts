import { Bilhete } from './../../model/bilhete.model';
import { ICredenciais } from './../../model/credenciais';
import { UsuarioDTO } from '../../model/usuario.model';
import { Aposta } from './../../model/aposta.model';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ApostaService {

  aposta: Aposta = new Aposta();
  bilhete: Bilhete = new Bilhete;
  bilheteSalvo: Bilhete = new Bilhete();
  credenciais!: ICredenciais;
  private usuarioLogado: UsuarioDTO = new UsuarioDTO();

  constructor(private snackBar: MatSnackBar) { }

  adicionar(): void {
    this.bilhete.apostas.push(this.aposta);
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top"
    })
  }

  getUsuarioLogado() : UsuarioDTO {
    return this.usuarioLogado;
  }

  setUSuarioLogado(usuario: UsuarioDTO) : void {
    this.usuarioLogado = usuario;
  }


}
