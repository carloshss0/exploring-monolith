import Address from "../../../@shared/domain/value-object/address.value-object"
import Id from "../../../@shared/domain/value-object/id.value-object"
import Invoice from "../../domain/invoice"
import InvoiceItems from "../../domain/invoice.items"
import FindInvoiceUseCase from "./find-invoice.usecase"

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



const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    }
}

describe("Test Find Invoice usecase", () => {

    it("Should Find invoice", async () => {

        const invoiceRepository = MockRepository();

        const input = {
            id: "1",
        }

        const usecase = new FindInvoiceUseCase(invoiceRepository);
        const result = await usecase.execute(input);

        expect(result.id).toBeDefined();
        expect(result.name).toBe(invoice.name);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.number).toBe(invoice.address.number);
        expect(result.address.complement).toBe(invoice.address.complement);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.zipCode).toBe(invoice.address.zipCode);
        expect(result.total).toBe(invoice.total);
        expect(result.createdAt).toBe(invoice.createdAt);
    })
})