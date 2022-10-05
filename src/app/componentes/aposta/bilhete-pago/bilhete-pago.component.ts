import { ApostaService } from './../../services/aposta.service';
import { Bilhete } from './../../../model/bilhete.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bilhete-pago',
  templateUrl: './bilhete-pago.component.html',
  styleUrls: ['./bilhete-pago.component.scss']
})
export class BilhetePagoComponent implements OnInit {

  bilhetePago: Bilhete[] = [];
  displayedColumns = ['descricao'];

  constructor(private apostaService: ApostaService) { 

  }

  ngOnInit(): void {
    this.bilhetePago.push(this.apostaService.bilheteSalvo);
  }

}
