import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceItemsModel from "../repository/invoice.items.model";
import InvoiceFacadeFactory from "../factory/invoice.factory";
import InvoiceItems from "../domain/invoice.items";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address.value-object";

describe("Invoice Facade test", () => {
    let sequelize: Sequelize;
    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true}
        });

        await sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
        await sequelize.sync();
    });

    afterEach( async () => {
        await sequelize.close();
    });

    it("Should generate an invoice", async () => {

        const invoiceFacade = InvoiceFacadeFactory.create();

        const invoiceItem1 = new InvoiceItems({
            id: new Id("1"),
            name: "Item 1",
            price: 10,
        })

        const invoiceItem2 = new InvoiceItems({
            id: new Id("2"),
            name: "Item 2",
            price: 100,
        })

        const invoiceItems = [invoiceItem1, invoiceItem2];

        const address = new Address(
            "Street 1",
            1,
            "block a",
            "Mock City",
            "Mock State",
            "Mock ZipCode",
        );

        const input = {
            name: "Mock Person",
            document: "123",
            street: address.street,
            number: address.number,
            complement: address.complement,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            items: invoiceItems.map((item) => {
                return {
                    id: item.id.id,
                    name: item.name,
                    price: item.price
                }
            }),
        }



        
        const invoiceOutputDto = await invoiceFacade.generate(input);

        const invoiceDb = await InvoiceModel.findOne({
            where: { id: invoiceOutputDto.id }
        });

        expect(invoiceDb?.id).toBeDefined();
        expect(invoiceDb?.name).toBe(input.name);
        expect(invoiceDb?.address.street).toBe(input.street);
        expect(invoiceDb?.address.number).toBe(input.number);
        expect(invoiceDb?.address.complement).toBe(input.complement);
        expect(invoiceDb?.address.city).toBe(input.city);
        expect(invoiceDb?.address.zipCode).toBe(input.zipCode);
        expect(invoiceDb?.total).toBe(110);

    });

    it("Should find an invoice", async () => {
         const invoiceFacade = InvoiceFacadeFactory.create();

        const invoiceItem1 = new InvoiceItems({
            id: new Id("1"),
            name: "Item 1",
            price: 10,
        })

        const invoiceItem2 = new InvoiceItems({
            id: new Id("2"),
            name: "Item 2",
            price: 100,
        })

        const invoiceItems = [invoiceItem1, invoiceItem2];

        const address = new Address(
            "Street 1",
            1,
            "block a",
            "Mock City",
            "Mock State",
            "Mock ZipCode",
        );

        const input = {
            name: "Mock Person",
            document: "123",
            street: address.street,
            number: address.number,
            complement: address.complement,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            items: invoiceItems.map((item) => {
                return {
                    id: item.id.id,
                    name: item.name,
                    price: item.price,
                }
            }),
        }

        const invoiceOutputDto = await invoiceFacade.generate(input);

        const inputFind = {
            id: invoiceOutputDto.id,
        }

        const result = await invoiceFacade.find(inputFind);

        expect(result.id).toBe(invoiceOutputDto.id);
        expect(result.name).toBe(input.name);
        expect(result.address.street).toBe(input.street);
        expect(result.address.number).toBe(input.number);
        expect(result.address.complement).toBe(input.complement);
        expect(result.address.city).toBe(input.city);
        expect(result.address.zipCode).toBe(input.zipCode);
        expect(result.total).toBe(110);
    })
});