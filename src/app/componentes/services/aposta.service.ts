import { Bilhete } from './../../model/bilhete.model';
import { ICredenciais } from './../../model/credenciais';
import { UsuarioDTO } from './../../model/usuario.dto';
import { Aposta } from './../../model/aposta.model';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ApostaService {

  aposta: Aposta = new Aposta();
  bilhete: Bilhete = new Bilhete;
  credenciais!: ICredenciais;

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


}
