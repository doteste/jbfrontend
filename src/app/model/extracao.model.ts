import { Time } from "@angular/common";

export interface Extracao {
    id?: number;
    descricao: string;
    hora: Time;
    qtdPremios: number;
}