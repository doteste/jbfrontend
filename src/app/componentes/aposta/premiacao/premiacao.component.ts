import { PremiacaoCalculoDTO } from '../../../model/premiacaocalculo.dto';
import { PremiacaoService } from './../../services/premiacao.service';
import { Premio } from '../../../model/premio.model';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApostaService } from '../../services/aposta.service';
import { Premiacao } from './../../../model/premiacao.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-premiacao',
  templateUrl: './premiacao.component.html',
  styleUrls: ['./premiacao.component.scss']
})
export class PremiacaoComponent implements OnInit {

  formCtrl = new FormControl('');

  premiosDO: Premio[] = [{ id: 1, num: '1º', enabled: true, visible: true }, { id: 2, num: '2º', enabled: true, visible: true },
  { id: 3, num: '3º', enabled: true, visible: true }, { id: 4, num: '4º', enabled: true, visible: true },
  { id: 5, num: '5º', enabled: true, visible: true }, { id: 6, num: '6º', enabled: true, visible: true },
  { id: 7, num: '7º', enabled: true, visible: true }, { id: 8, num: '8º', enabled: true, visible: true },
  { id: 9, num: '9º', enabled: true, visible: true }, { id: 10, num: '10º', enabled: true, visible: true }];

  premiosAO: Premio[] = [{ id: 1, num: '1º', enabled: true, visible: true }, { id: 2, num: '2º', enabled: true, visible: true },
  { id: 3, num: '3º', enabled: true, visible: true }, { id: 4, num: '4º', enabled: true, visible: true },
  { id: 5, num: '5º', enabled: true, visible: true }, { id: 6, num: '6º', enabled: true, visible: true },
  { id: 7, num: '7º', enabled: true, visible: true }, { id: 8, num: '8º', enabled: true, visible: true },
  { id: 9, num: '9º', enabled: true, visible: true }, { id: 10, num: '10º', enabled: true, visible: true }];

  dsExtracao!: string;
  dsTipo!: string;
  dsNumeros!: string;
  premiacao: Premiacao = new Premiacao();
  
  displayedColumns = ['do', 'ao', 'valor']

  constructor(
    private apostaService: ApostaService,
    private router: Router,
    private premiacaoService: PremiacaoService) { }

  ngOnInit(): void {
    this.limparForm();
    this.dsExtracao = this.apostaService.bilhete.extracao.descricao;
    this.dsTipo = this.apostaService.aposta.tipo.abreviatura + "-" + this.apostaService.aposta.tipo.descricao;
    this.dsNumeros = this.apostaService.aposta.numeros;
  }

  maisPremios(): void {
    let premio: PremiacaoCalculoDTO = this.getPremioValorDTO();
    this.premiacaoService.calcular(premio).subscribe(res => {
      this.premiacao.valorTotal = res;
      this.premiacao.index = this.apostaService.aposta.premios.length + 1;
      this.apostaService.aposta.premios.push(this.premiacao);
      this.limparForm();
    })
  }

  finalizar(): void {

    if (this.premiacao.nuDo === 0 || this.premiacao.nuAo === 0 || this.premiacao.valor === undefined 
      || this.premiacao.valor <= 0 || (this.isNotQuinaOuSena() && this.premiacao.flMultiplicacao === undefined)) {
      this.apostaService.showMessage('Informe todos os campos para prosseguir');
    } else {
      let premio: PremiacaoCalculoDTO = this.getPremioValorDTO();
      
      this.premiacaoService.calcular(premio).subscribe(res => {
        this.premiacao.valorTotal = res;
        this.premiacao.index = this.apostaService.aposta.premios.length + 1;
        this.apostaService.aposta.premios.push(this.premiacao);
        this.apostaService.adicionar();

        this.router.navigate(['aposta/pagamento']);
      })
    }
  }

  getPremioValorDTO(): PremiacaoCalculoDTO {
    let premio: PremiacaoCalculoDTO = new PremiacaoCalculoDTO();
    premio.numeros = this.apostaService.aposta.numerosList;
    premio.premiacao = this.premiacao;
    premio.quantidade = this.apostaService.aposta.numerosList.length;
    premio.tipo = this.apostaService.aposta.tipo;
    return premio;
  }

  voltar(): void {
    this.router.navigate(['aposta/numeros'])
  }

  cancel(): void {
    this.router.navigate(['aposta/extracoes']);
  }

  limparForm(): void {
    this.premiacao = new Premiacao();
    this.isVisiblePremio();
  }


  isVisiblePremio(): void {
    this.premiosDO.forEach(p => {
      if (p.id <= this.apostaService.bilhete.extracao.qtdPremios) {
        p.visible = true;
      } else {
        p.visible = false;
      }
    });

    this.premiosAO.forEach(p => {
      if (p.id <= this.apostaService.bilhete.extracao.qtdPremios) {
        p.visible = true;
      } else {
        p.visible = false;
      }
    });
  }

  isEnabled(id: number): void {
    if (this.premiacao.nuDo > 0) {
      this.premiosAO.forEach(p => {
        if (p.id >= id) {
          p.enabled = true;
        } else {
          p.enabled = false;
        }
      });
    }
  }

  isNotQuinaOuSena(): boolean {
    return !(this.apostaService.aposta.tipo.abreviatura === 'Q' || this.apostaService.aposta.tipo.abreviatura === 'S');
  }

}
