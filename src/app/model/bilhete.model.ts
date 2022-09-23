import { Extracao } from './extracao.model';
import { Aposta } from "./aposta.model";

export class Bilhete {
    extracao!: Extracao;
    apostas: Aposta[] = [];
}