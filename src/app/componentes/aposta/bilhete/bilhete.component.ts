import { BilheteService } from './../../services/bilhete.service';
import { Router } from '@angular/router';
import { Bilhete } from './../../../model/bilhete.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bilhete',
  templateUrl: './bilhete.component.html',
  styleUrls: ['./bilhete.component.scss']
})
export class BilheteComponent implements OnInit {

  bilhetes: Bilhete[] = [];

  displayedColumns = ['data','descricao'];
  displayedColumnsMobile = ['descricao'];

  constructor(
    private router: Router,
    private bilheteService: BilheteService
  ) { }

  ngOnInit(): void {
    this.bilheteService.listar().subscribe(res => {
      this.bilhetes = res;
    })
  }

  cancel() : void {
    this.router.navigate(['/aposta/extracoes']);
  }

}
