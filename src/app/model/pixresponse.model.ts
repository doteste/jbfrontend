import { QrCode } from './qrcode.model';
export class PixResponse {
    id!:String;
    referenceId!:String;
    createdAt!: String;
    qr_codes: QrCode[] = [];
}