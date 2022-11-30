import { Cartao } from './cartao';
export class MetodoPagamento {
    type!: String;
    installments!: number;
    capture: Boolean = true;
    card: Cartao = new Cartao();
}