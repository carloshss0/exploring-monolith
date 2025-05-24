import Address from "../../../@shared/domain/value-object/address.value-object";
import InvoiceItems from "../../domain/invoice.items";

export interface FindInvoiceInputDto {
    id: string;
}

export interface FindInvoiceOutputDto {
    id: string;
    name: string;
    document: string;
    address: Address;
    items: {
        id: string,
        name: string,
        price: number,
    }[];
    total: number;
    createdAt: Date;
}

