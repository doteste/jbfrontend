import { Aposta } from './../../../model/aposta.model';
import { Extracao } from './../../../model/extracao.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tipo } from 'src/app/model/tipo.model';
import { ApostaService } from '../../services/aposta.service';
import { TipoService } from './../../services/tipo.service';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.scss']
})
export class TipoComponent implements OnInit {

  tipos: Tipo[] = [];
  extracao!: Extracao;

  displayedColumns = ['descricao'];

  constructor(private router: Router,
    private apostaService: ApostaService,
    private tipoService: TipoService) { }

  ngOnInit(): void {
    this.extracao = this.apostaService.bilhete.extracao;
    this.apostaService.aposta = new Aposta();
    this.apostaService.bilhete.extracao = this.extracao;
    this.tipoService.listar().subscribe(res => {
      this.tipos = res;
    });
  }

  proximo(tipo: Tipo): void {
    this.apostaService.aposta.tipo = tipo;
    this.router.navigate(['aposta/numeros'])
  }

  cancel(): void {
    this.router.navigate(['aposta/extracoes']);
  }


}
