import { Charge } from './charge';
export class PagamentoResponse {

    id!:String;
    charges: Charge[] = [];
}