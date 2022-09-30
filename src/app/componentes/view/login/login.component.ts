import { AlertaService } from './../../services/alerta.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ICredenciais } from './../../../model/credenciais';
import { ApostaService } from './../../services/aposta.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  error = '';
  loading = false;
  formLogin: FormGroup = new FormGroup({
    usuario: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private apostaService: ApostaService) { 
      if(this.authService.isLoggedIn) {
        this.router.navigate(['aposta/extracoes']);
      }
    }

  ngOnInit(): void {
    this.authService.setLoggedIn(false);
  }

  login(): void {
    if(this.formLogin.valid){
      this.loading = true;
      let credenciais: ICredenciais = {
        username: this.formLogin.value.usuario,
        password: this.formLogin.value.senha
      } 
      this.authService.login(credenciais).subscribe(res =>{
        this.apostaService.credenciais = credenciais;
        this.authService.setLoggedIn(true);
        this.router.navigate(['aposta/extracoes']);
      },
      error => {
        this.error = 'Login inválido!';
        this.loading = false;
      });
    }
  }

  navigate(): void {

  }

  
}
