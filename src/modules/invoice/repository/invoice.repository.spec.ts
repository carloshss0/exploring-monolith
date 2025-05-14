import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import InvoiceRepository from "./invoice.repository";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/invoice.items";
import Address from "../../@shared/domain/value-object/address.value-object";
import Invoice from "../domain/invoice";
import InvoiceItemsModel from "./invoice.items.model";

describe("InvoiceRepository test", () => {
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
    })

    it("should create an invoice", async () => {
        const invoiceRepository = new InvoiceRepository();

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
        
        
        const invoice = new Invoice({
            id: new Id("1"),
            name: "Mock person",
            document: "123",
            address: address,
            items: invoiceItems,
        });

        await invoiceRepository.generate(invoice);

        const invoiceDb = await InvoiceModel.findOne({
            where: {id: invoice.id.id}
        });

        expect(invoice.id.id).toBe(invoiceDb?.id);
        expect(invoice.name).toBe(invoiceDb?.name);
        expect(invoice.document).toBe(invoiceDb?.document);
        expect(invoice.address.street).toBe(invoiceDb?.address.street);
        expect(invoice.address.number).toBe(invoiceDb?.address.number);
        expect(invoice.address.complement).toBe(invoiceDb?.address.complement);
        expect(invoice.address.city).toBe(invoiceDb?.address.city);
        expect(invoice.address.state).toBe(invoiceDb?.address.state);
        expect(invoice.address.zipCode).toBe(invoiceDb?.address.zipCode);
        expect(invoice.items.length).toBe(2);
        expect(invoice.total).toBe(110);
    });

    it("Should find an invoice", async () => {

        const invoiceRepository = new InvoiceRepository();

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
        
        
        const invoice = new Invoice({
            id: new Id("1"),
            name: "Mock person",
            document: "123",
            address: address,
            items: invoiceItems,
        });

        await invoiceRepository.generate(invoice);


        const input = {
            id: "1"
        }

        const result = await invoiceRepository.find(input.id);

        expect(invoice.id.id).toBe(result.id.id);
        expect(invoice.name).toBe(result.name);
        expect(invoice.document).toBe(result.document);
        expect(invoice.address.street).toBe(result.address.street);
        expect(invoice.address.number).toBe(result.address.number);
        expect(invoice.address.complement).toBe(result.address.complement);
        expect(invoice.address.city).toBe(result.address.city);
        expect(invoice.address.state).toBe(result.address.state);
        expect(invoice.address.zipCode).toBe(result.address.zipCode);
        expect(invoice.items.length).toBe(2);
        expect(invoice.total).toBe(110);

    })


})