import UseCaseInterface from "../../@shared/domain/usecase/use-case.interface";
import { AddClientFacadeInputDto, ClientFacadeInterface, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client.facade.interface";

export interface UseCasesProps {
    addClient: UseCaseInterface;
    findClient: UseCaseInterface;
}

export default class ClientFacade implements ClientFacadeInterface {

    private _addClient: UseCaseInterface;
    private _findClient: UseCaseInterface;

    constructor(clientUseCasesProps: UseCasesProps){
        this._addClient = clientUseCasesProps.addClient;
        this._findClient = clientUseCasesProps.findClient;
    }

    async addClient(input: AddClientFacadeInputDto): Promise<void> {
        return await this._addClient.execute(input);
    }
    
    async findClient(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
         return await this._findClient.execute(input);
    }

   
    
}