import { Tipo } from 'src/app/model/tipo.model';
import { Premiacao } from './premiacao.model';
export class PremiacaoCalculoDTO {
    premiacao!: Premiacao;
    tipo!: Tipo;
    quantidade!: number;
    numeros: string[] = [];
}