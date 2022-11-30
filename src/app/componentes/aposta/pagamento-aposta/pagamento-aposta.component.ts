import { PagamentoResponse } from './../../../model/pagamentoresponse';
import { BilheteService } from './../../services/bilhete.service';
import { PagamentoPagSeguro } from './../../../model/pagamentopagseguro';
import { ApostaService } from './../../services/aposta.service';
import { MetodoPagamento } from './../../../model/metodopagamento';
import { PagamentoService } from './../../services/pagamento.service';
import { Router } from '@angular/router';
import { Cartao } from './../../../model/cartao';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagamento-aposta',
  templateUrl: './pagamento-aposta.component.html',
  styleUrls: ['./pagamento-aposta.component.scss']
})
export class PagamentoApostaComponent implements OnInit {

  cartao: Cartao = new Cartao();
  tipoSelecionado!: string;
  mesAno!: string;
  metodoPagamento: MetodoPagamento = new MetodoPagamento();

  pagamento: PagamentoPagSeguro = new PagamentoPagSeguro();
  pagamentoResponse: PagamentoResponse = new PagamentoResponse();

  constructor(
    private router: Router,
    private apostaService: ApostaService,
    private pagamentoService: PagamentoService,
    private bilheteService: BilheteService,
  ) { 
    
  }

  ngOnInit(): void {
  }

  cancelar(): void {
    this.router.navigate(['aposta/extracoes']);
  }

  confirmar():void {
    if(this.validaCampos()) {
      this.cartao.exp_year = this.mesAno.substring(3,8);
      this.cartao.exp_month = this.mesAno.substring(0,2)
      this.metodoPagamento.card = this.cartao;
      this.metodoPagamento.type = this.tipoSelecionado;
      this.metodoPagamento.installments = 1;
      this.pagamento.metodoPagamento = this.metodoPagamento;
      this.pagamento.bilheteDTO = this.apostaService.bilhete;
  
      this.pagamentoService.efetuarPagamento(this.pagamento).subscribe(res => {
        this.pagamentoResponse = res;
        if(this.pagamentoResponse.charges[0].status === "PAID") {
          this.bilheteService.salvar().subscribe(res1 => {
            this.apostaService.bilheteSalvo = res1;
            this.router.navigate(['/aposta/comprovante']);
          },
          error => {
            const errorMessage = error.message;
            this.apostaService.showMessage(errorMessage);
          });
        }else{
          this.apostaService.showMessage('Pagamento não foi aprovado!');
        }
        
      },
      error => {
        const errorMessage = error.message;
        this.apostaService.showMessage(errorMessage);
      })
    }else{
      this.apostaService.showMessage('Informe todos os campos para prosseguir');
    }
  

  }

  validaCampos(): boolean {
    if (this.mesAno === undefined 
      || this.tipoSelecionado === undefined
      || this.cartao.holder === undefined
      || this.cartao.number === undefined
      || this.cartao.security_code === undefined) {
      return false;
    }
    return true;
  }

}
