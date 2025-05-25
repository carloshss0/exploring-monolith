import { mapFinderOptions } from "sequelize/types/utils";
import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceModel from "./invoice.model";
import InvoiceItems from "../domain/invoice.items";
import InvoiceItemsModel from "./invoice.items.model";

export default class InvoiceRepository implements InvoiceGateway {
    async find(id: string): Promise<Invoice> {
        
        const invoice = await InvoiceModel.findOne(
            { 
                where: {id},
                include: [InvoiceItemsModel],
        });
        
        if (!invoice) {
           throw new Error(`invoice with id ${id} not found`)
        }

        const items: InvoiceItems[] = invoice.items.map((item) => new InvoiceItems({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
        }))

        return new Invoice({
            id: new Id(invoice?.id),
            name: invoice?.name,
            document: invoice.document,
            address: new Address(
                invoice.address.street,
                invoice.address.number,
                invoice.address.complement,
                invoice.address.city,
                invoice.address.state,
                invoice.address.zipCode
            ),
            items: items,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
            
        });
    }

    async generate(input: Invoice): Promise<void> {
        
        await InvoiceModel.create({
            id: input.id.id,
            name: input.name,
            document: input.document,
            address: input.address,
            items: input.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
            })),
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
            total: input.total,
            },
            {
                include: [InvoiceItemsModel],
            }
        ) 
    };
    
}