import { Router } from '@angular/router';
import { AlertaService } from './alerta.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExceptionService {

  constructor(
    private alertaService: AlertaService,
    private router: Router
  ) { }

  public verificarErro(err: HttpErrorResponse) {
    let errMessage: string;
    switch(err.status) {
      case 401: {
        errMessage = `${err.error.error}`;
        break;
      }
      default: {
        errMessage = `${err.error.message}`;
        break;
      }
    }
    this.alertaService.erro(errMessage);
    return throwError(() => new Error(errMessage));
  }
}
