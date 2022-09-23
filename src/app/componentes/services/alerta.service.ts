import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor(
    private messageService: MessageService
  ) { }

  public sucesso(mensagem: string): void {
    this.messageService.add({
      severity: 'success', summary: 'Sucesso', detail: mensagem
    })
  }

  public erro(mensagem: string): void {
    this.messageService.add({
      severity: 'error', summary: 'Erro', detail: mensagem
    });
  }

}
