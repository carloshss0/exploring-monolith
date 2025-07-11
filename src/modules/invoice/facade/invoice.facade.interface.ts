import Address from "../../@shared/domain/value-object/address.value-object";
import InvoiceItems from "../domain/invoice.items";

export interface FindInvoiceFacadeInputDto {
    id: string,
}

export interface FindInvoiceFacadeOutputDto {
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

export interface GenerateInvoiceFacadeInputDto {
    name: string;
    document: string;
    street: string;
    number: number;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items: {
        id: string,
        name: string,
        price: number,
    }[];
}

export interface GenerateInvoiceFacadeOutputDto {
    id: string;
    name: string;
    document: string;
    street: string;
    number: number;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items: {
        id: string,
        name: string,
        price: number,
    }[];
}

export default interface InvoiceFacadeInterface {
    find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto>
    generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto>;
}