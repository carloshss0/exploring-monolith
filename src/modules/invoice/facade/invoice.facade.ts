import UseCaseInterface from "../../@shared/domain/usecase/use-case.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

export interface UseCasesProps {
    find: UseCaseInterface;
    generate: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {

    private _find: UseCaseInterface;
    private _generate: UseCaseInterface;
    
    constructor (useCaseProps: UseCasesProps) {
        this._find = useCaseProps.find;
        this._generate = useCaseProps.generate;
        
    }
    find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
        // case dto from the usecase is different from the dto of facade, you must convert the usecase's dto.
        return this._find.execute(input);
    }
    generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return this._generate.execute(input);
    }
    
}