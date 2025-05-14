import UseCaseInterface from "../../../@shared/domain/usecase/use-case.interface";
import Address from "../../../@shared/domain/value-object/address.value-object";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceInputDto, FindInvoiceOutputDto } from "./find-invoice.dto";

export default class FindInvoiceUseCase implements UseCaseInterface {

    private _invoiceRepository: InvoiceGateway;
    
    constructor(invoiceRepository: InvoiceGateway) {
        this._invoiceRepository = invoiceRepository;
    }

    async execute(input: FindInvoiceInputDto): Promise<FindInvoiceOutputDto> {
        // const address = new Address(
        //     input.street,
        //     input.number,
        //     input.complement,
        //     input.city,
        //     input.state,
        //     input.zipCode,
        // )


        // const invoice = new Invoice({
        //     id: new Id(),
        //     name: input.name,
        //     document: input.document,
        //     address: address,
        //     items: input.items,
        // })

        const invoice = await this._invoiceRepository.find(input.id);


        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            address: invoice.address,
            items: invoice.items,
            total: invoice.total,
            createdAt: invoice.createdAt
        }
    }
    
}