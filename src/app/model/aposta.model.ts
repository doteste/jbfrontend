import { Extracao } from './extracao.model';
import { Premiacao } from './premiacao.model';
import { Tipo } from './tipo.model';

export class Aposta {

    id?: number;
    index!: number;
    tipo!: Tipo;
    numeros!: string;
    quantidade: number =0;
    premios: Premiacao[] = [];
    numValor!: number;
    numValorTotal!: number;
    numerosList: string[] = [];

}