import { PaymentResponse } from './paymentresponse';
export class Charge {
    id!: string;
    status!: String;
    paymentResponse!: PaymentResponse;
}