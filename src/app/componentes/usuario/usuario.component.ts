import { Router } from '@angular/router';
import { ApostaService } from './../services/aposta.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioDTO } from '../../model/usuario.model';
import { UsuarioService } from './../services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  usuario: UsuarioDTO = new UsuarioDTO();
  

  formCadastro: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    telefone: new FormControl('', Validators.required),
    login: new FormControl('', Validators.required),
    confirmacao: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private apostaService: ApostaService) { }

  ngOnInit(): void {
    this.usuario = new UsuarioDTO();
  }

  setUsuario(): void {
    this.usuario.nome = this.formCadastro.value.nome;
    this.usuario.cpf = this.formCadastro.value.cpf;
    this.usuario.email = this.formCadastro.value.email;
    this.usuario.telefone = this.formCadastro.value.telefone;
    this.usuario.login = this.formCadastro.value.login;
    this.usuario.senha = this.formCadastro.value.senha;
  }

  validarConfirmacao(): boolean {
    return this.formCadastro.value.senha === this.formCadastro.value.confirmacao;
  }

  salvar(): void {
    if(this.formCadastro.valid){
      if(!this.validarConfirmacao()){
        this.apostaService.showMessage('Confirmação de senha inválida');
      } else {
        this.setUsuario();
        this.usuarioService.salvar(this.usuario).subscribe(res => {
          if(res.error) {
            this.apostaService.showMessage(res.messageError);
          }else{
            this.apostaService.showMessage('Usuário salvo com sucesso!');
            this.router.navigate(['']);
          }
        },
        error => {
          const errorMessage = error.message;
          this.apostaService.showMessage(errorMessage);
        })
      }

    }else {
      this.apostaService.showMessage('Existe(m) campo(s) não informado(s)!');
    }
  }

  cancelar() : void {
    this.router.navigate(['']);
  }


}
