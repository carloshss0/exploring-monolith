import UseCaseInterface from "../../@shared/domain/usecase/use-case.interface";
import ProductAdmFacadeInterface, { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-adm.facade.interface";

export interface UseCasesProps {
    addUseCase: UseCaseInterface;
    checkStockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {

    private _addUseCase: UseCaseInterface;
    private _checkStockUseCase: UseCaseInterface;
    
    constructor (useCaseProps: UseCasesProps) {
        this._addUseCase = useCaseProps.addUseCase;
        this._checkStockUseCase = useCaseProps.checkStockUseCase;
        
    }
    addProduct(input: AddProductFacadeInputDto): Promise<void> {
        // case dto from the usecase is different from the dto of facade, you must convert the usecase's dto.
        return this._addUseCase.execute(input);
    }
    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._checkStockUseCase.execute(input);
    }
    
}