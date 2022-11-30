import { ExtracaoService } from './../../services/extracao.service';
import { ApostaService } from '../../services/aposta.service';
import { Aposta } from './../../../model/aposta.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Extracao } from './../../../model/extracao.model';


@Component({
  selector: 'app-extracao',
  templateUrl: './extracao.component.html',
  styleUrls: ['./extracao.component.scss']
})
export class ExtracaoComponent implements OnInit {

  extracoes: Extracao[] = [];
  
  displayedColumns = ['descricao']

  constructor(
    private router: Router, 
    private apostaService: ApostaService,
    private extracaoService: ExtracaoService
  ) { }

  ngOnInit(): void {
    this.apostaService.aposta = new Aposta();
    this.apostaService.bilhete.apostas = [];
    this.extracaoService.setExtracaoIn(false);
    this.extracaoService.listar().subscribe(res => {
      this.extracoes = res;
    });
  }

  proximo(extracao: Extracao) : void {
    this.apostaService.bilhete.extracao = extracao;
    this.apostaService.bilhete.loginUsuario = this.apostaService.credenciais.username;
    this.extracaoService.setExtracaoIn(true);
    this.router.navigate(['aposta/tipo/${extracao.id}'])
  }


}
