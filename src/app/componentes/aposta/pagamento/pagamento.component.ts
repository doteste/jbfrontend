import { PagamentoService } from './../../services/pagamento.service';
import { BilheteService } from './../../services/bilhete.service';
import { Router } from '@angular/router';
import { ApostaService } from '../../services/aposta.service';
import { Aposta } from './../../../model/aposta.model';
import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit {

  dsExtracao!: string;
  apostas: Aposta[] = [];
  codigoCheckout!: any;
  
  displayedColumns = ['descricao'];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private apostaService: ApostaService, 
    private bilheteService: BilheteService,
    private pagamentoService: PagamentoService,
    private router: Router) { }

  ngOnInit(): void {
    this.dsExtracao = this.apostaService.bilhete.extracao.descricao;
    this.apostas = this.apostaService.bilhete.apostas;
  }

  getTotalGeral() :number {
    let totalGeral = 0;
    this.apostaService.bilhete.apostas.forEach(aposta => {
      aposta.premiacoes.forEach(premio => {
        totalGeral += premio.valorTotal;
      });
    });
    return totalGeral;
  }

  maisJogos() :void {
    this.router.navigate(['aposta/tipo/${this.apostaService.aposta.extracao .id}'])
  }

  cancel(): void {
    this.router.navigate(['aposta/extracoes']);
  }

  pagar() : void {
    console.log(123);
    this.router.navigate(['aposta/pagamento/cartao']);
  }

}
