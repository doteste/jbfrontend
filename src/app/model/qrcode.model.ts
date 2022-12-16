import { Link } from './link.model';
export class QrCode {
    id!: string;
    expirationDate!: string;
    text!: string;
    links: Link[] = []; 
}