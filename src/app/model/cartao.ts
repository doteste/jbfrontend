import { Holder } from './holder';
export class Cartao {

    number!: String;
    exp_month!: String;
    exp_year!: String;
    security_code!: String;
    holder: Holder = new Holder();
    store: Boolean = false;

}