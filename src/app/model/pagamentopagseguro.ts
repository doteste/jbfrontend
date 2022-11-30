import { MetodoPagamento } from './metodopagamento';
import { Bilhete } from './bilhete.model';
export class PagamentoPagSeguro {
    bilheteDTO: Bilhete = new Bilhete();
    metodoPagamento: MetodoPagamento = new MetodoPagamento();
}