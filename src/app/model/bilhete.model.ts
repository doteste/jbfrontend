import { UsuarioDTO } from './usuario.model';
import { Extracao } from './extracao.model';
import { Aposta } from "./aposta.model";

export class Bilhete {
    id: any;
    numero: string = '';
    dhAposta: Date = new Date();
    extracao!: Extracao;
    apostas: Aposta[] = [];
    valorTotal: Number = 0;
    loginUsuario: string ='';
    autenticacao!: string;
}
