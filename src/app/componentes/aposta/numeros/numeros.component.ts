import { Tipo } from './../../../model/tipo.model';
import { RegraTipo } from './../../../model/regratipo.model';
import { RegraTipoService } from './../../services/regra-tipo.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router, ActivatedRoute } from '@angular/router';

import { ApostaService } from '../../services/aposta.service';


@Component({
  selector: 'app-numeros',
  templateUrl: './numeros.component.html',
  styleUrls: ['./numeros.component.scss']
})
export class NumerosComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedChips: any[] = [];
  numerosCtrl = new FormControl('');

  @ViewChild('numeroInput') numeroInput!: ElementRef<HTMLInputElement>;

  idExtracao: any = "";
  dsExtracao!: string;
  dsTipo!: string;
  quantidade: number = 0;
  numero: string = "";
  numInicial: string = "";
  numFinal: string = "";
  numeros: string[] = [];
  regraTipo: RegraTipo = new RegraTipo();
  maxlenght: number = 3;
  separador: string = " ";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apostaService: ApostaService,
    private regraTipoService: RegraTipoService
  ) { }

  ngOnInit(): void {
    this.idExtracao = this.route.snapshot.paramMap.get('id');
    this.dsExtracao = this.apostaService.bilhete.extracao.descricao;
    this.dsTipo = this.apostaService.aposta.tipo.abreviatura + "-" + this.apostaService.aposta.tipo.descricao;
    this.regraTipoService.getRegra(this.apostaService.aposta.tipo.id).subscribe(res => {
      this.regraTipo = res;
      this.maxlenght = this.regraTipo.qtdMaxAlgarismos;
    })
  }

  proximo(): void {
    if (this.quantidade === 0) {
      this.apostaService.showMessage('Informe um palpite!');
    } else {
      this.apostaService.aposta.numeros = this.listToNum(this.apostaService.aposta.tipo);
      this.apostaService.aposta.numerosList = this.numeros;
      this.apostaService.aposta.quantidade = this.quantidade;
      this.router.navigate(['aposta/premiacao']);
    }
  }

  voltar(): void {
    this.router.navigate(['aposta/tipo/${this.apostaService.aposta.extracao.id}'])
  }

  cancel(): void {
    this.router.navigate(['aposta/extracoes']);
  }


  remove(numero: string): void {
    const index = this.numeros.indexOf(numero);

    if (index >= 0) {
      this.numeros.splice(index, 1);
    }

    this.quantidade--;
  }

  removeAll(): void {
    this.numeros = [];
    this.quantidade = 0;
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.numeros.push(event.option.viewValue);
    this.numeroInput.nativeElement.value = '';
    this.numerosCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.numeros.filter(numero => numero.toLowerCase().includes(filterValue));
  }

  add(event: any): void {
    const value = (event.target.value || '').trim();
    if (!this.validaNumero(value)) {
      this.apostaService.showMessage('Palpite inválido inválido!');
    } else {
      if (value.length === this.maxlenght) {
        event.target.value = "";
        this.quantidade++;
        if(this.apostaService.aposta.tipo.flGrupo){
          let num: string = this.formatarNumeroGrupo(value);
          this.numeros.push(num);
        }else{
          this.numeros.push(value);
        }
      }
      event.chipInput!.clear();


      this.numerosCtrl.setValue(null);
    }
  }

  addPalpite(): void {
    if (this.regraTipo.qtdMinAlgarismos > this.numero.length) {
      this.apostaService.showMessage('Palpite inválido inválido!');
    }else{
      this.quantidade++;
        if(this.apostaService.aposta.tipo.flGrupo){
          let num: string = this.formatarNumeroGrupo(this.numero);
          this.numeros.push(num);
        }else{
          this.numeros.push(this.numero);
        }
    }
    this.numero = "";
  }

  addIntervalo(event: any): void {
    const value = Number((event.target.value || '').trim());
    if (this.numInicial === "" || this.numInicial.length < this.regraTipo.qtdMinAlgarismos) {
      event.target.value = "";
      this.apostaService.showMessage('Informe o palpite inicial!');
    } else {
      if ((!this.validaNumero(this.numInicial))||(!this.validaNumero(this.numFinal))) {
        this.apostaService.showMessage('Palpite inválido!');
      } else {
        let num = Number(this.numInicial);

        if (event.target.value.length === this.maxlenght) {
          for (num; num <= value; num++) {
            this.numeros.push(String(num));
            this.quantidade++;
          }
          this.numInicial = "";
          event.target.value = "";
        }
      }
    }
  }

  addBtnIntervalo(): void {
    const value = Number((this.numFinal || '').trim());
    if (this.numInicial === "" || (this.numInicial.length < this.regraTipo.qtdMinAlgarismos)) {
      this.apostaService.showMessage('Palpite inicial inválido!');
    } else {
      if ((!this.validaNumero(this.numInicial))||(!this.validaNumero(this.numFinal))) {
        this.apostaService.showMessage('Palpite inválido!');
      } else {
        let num = Number(this.numInicial);

        for (num; num <= value; num++) {
          this.numeros.push(String(num));
          this.quantidade++;
        }
        this.numInicial = "";
        this.numFinal = "";
      }
    }
  }

  listToNum(tipo: Tipo): string {
    let dsNumeros = "";
    this.numeros.forEach(num => {
      dsNumeros = dsNumeros + this.separador + num;
    });
    return dsNumeros.trim();
  }

  isVisible(): boolean {
    return this.quantidade > 0;
  }

  validaNumero(numero: string): boolean {
    if(!this.isGrupo()) {  
      const num = Number(numero);
      if(this.regraTipo.valorMax > 0 && (this.regraTipo.valorMin > num || this.regraTipo.valorMax < num)){
        return false;
      }
      if ((this.maxlenght > 2 && this.maxlenght <=4) && numero.substring(1, 0) === "0") {
        return false;
      }
    }
    return true;
  }

  formatarNumeroGrupo(numero: string): string {
    const separador = "-";
    let nResp: string = "";
    for(let i = 0; i < numero.length; i++){
      if(i>1 && (i%2 === 0)){
        nResp = nResp+separador;
      }
      if(i===numero.length-1 && (numero.length%2 != 0)){
        nResp = nResp + numero.charAt(i).padStart(2,"0");
      }else {
          nResp = nResp + numero.charAt(i);
      }
    }

    return nResp;
  }

  isGrupo(): boolean {
    return this.apostaService.aposta.tipo.flGrupo;
  }

}
