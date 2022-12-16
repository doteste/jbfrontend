import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApostaService } from '../../services/aposta.service';
import { PagamentoService } from '../../services/pagamento.service';
import { BilheteService } from '../../services/bilhete.service';
import { PixResponse } from 'src/app/model/pixresponse.model';
import { QrCode } from 'src/app/model/qrcode.model';

@Component({
  selector: 'app-pagamento-pix',
  templateUrl: './pagamento-pix.component.html',
  styleUrls: ['./pagamento-pix.component.scss']
})
export class PagamentoPixComponent implements OnInit {

  pixResponse : PixResponse = new PixResponse();
  urlPix! : string;
  chavePix!: string;

  constructor(
    private router: Router,
    private apostaService: ApostaService,
    private pagamentoService: PagamentoService,
    private bilheteService: BilheteService,
  ) { }

  ngOnInit(): void {
    this.pagamentoService.getPixPagamento().subscribe(res => {
      this.pixResponse = res;
      this.urlPix = this.pixResponse.qr_codes[0].links.filter(link => link.rel == 'QRCODE.PNG')[0].href;
      this.chavePix = this.pixResponse.qr_codes[0].text;
    })
  }

  voltar(): void {
    this.router.navigate(['aposta/pagamento/cartao'])
  }

  finalizar(): void{
    this.apostaService.bilhete.autenticacao = this.getAutenticacao(this.pixResponse.qr_codes[0].id);
    this.bilheteService.salvar().subscribe(res1 => {
      this.apostaService.bilheteSalvo = res1;
      this.router.navigate(['/aposta/comprovante']);
    });
  }

  getAutenticacao(autenticacao: string): string {
    var re = /-/gi; 
    return autenticacao.substring(5).replace(re,"");
  }

}
