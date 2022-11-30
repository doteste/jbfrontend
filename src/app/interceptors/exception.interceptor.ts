import { AlertaService } from './../componentes/services/alerta.service';
import { ExceptionService } from './../componentes/services/exception.service';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ExceptionInterceptor implements HttpInterceptor {

  constructor(
    private alertaService: AlertaService,
    private exceptionService: ExceptionService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status == 401){
          this.alertaService.erro('Login inválido!')
        }
        return this.exceptionService.verificarErro(err);
      }
      ));
  }
}
