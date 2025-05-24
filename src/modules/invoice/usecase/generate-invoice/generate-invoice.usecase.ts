import UseCaseInterface from "../../../@shared/domain/usecase/use-case.interface";
import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice";
import InvoiceItems from "../../domain/invoice.items";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceInputDto, GenerateInvoiceOutputDto } from "./generate-invoice.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {

    private _invoiceRepository: InvoiceGateway;
    
    constructor(invoiceRepository: InvoiceGateway) {
        this._invoiceRepository = invoiceRepository;
    }

    async execute(input: GenerateInvoiceInputDto): Promise<GenerateInvoiceOutputDto> {
        const address = new Address(
            input.street,
            input.number,
            input.complement,
            input.city,
            input.state,
            input.zipCode,
        )


        const invoice = new Invoice({
            id: new Id(),
            name: input.name,
            document: input.document,
            address: address,
            items: input.items.map((item) => {
                return new InvoiceItems({
                    id: new Id(item.id),
                    name: item.name,
                    price: item.price,
                })
            }),
        })

        await this._invoiceRepository.generate(invoice);


        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map((item) => {
                return {
                    id: item.id.id,
                    name: item.name,
                    price: item.price,
                }
            }),
            total: invoice.total,
        }
    }
    
}