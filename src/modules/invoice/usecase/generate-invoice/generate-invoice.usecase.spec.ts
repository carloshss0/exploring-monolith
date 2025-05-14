import Address from "../../../@shared/domain/value-object/address.value-object"
import Id from "../../../@shared/domain/value-object/id.value-object"
import Invoice from "../../domain/invoice"
import InvoiceItems from "../../domain/invoice.items"
import GenerateInvoiceUseCase from "./generate-invoice.usecase"

const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn(),
    }
}

describe("Test Generate Invoice usecase", () => {

    it("Should generate invoice", async () => {

        const invoiceRepository = MockRepository();

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
            items: invoiceItems,
        }

        const usecase = new GenerateInvoiceUseCase(invoiceRepository);
        const result = await usecase.execute(input);

        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.street).toBe(input.street);
        expect(result.number).toBe(input.number);
        expect(result.complement).toBe(input.complement);
        expect(result.city).toBe(input.city);
        expect(result.zipCode).toBe(input.zipCode);
        expect(result.total).toBe(110);
    })
})