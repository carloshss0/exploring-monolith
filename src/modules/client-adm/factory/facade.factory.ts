import ClientFacade from "../facade/client.facade";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";

export default class ClientFacadeFactory {
    static create() {
        const clientRepository = new ClientRepository();
        const addClientUseCase = new AddClientUseCase(clientRepository);
        const findClientUseCase = new FindClientUseCase(clientRepository)
        const clientFacade = new ClientFacade({
            addClient: addClientUseCase,
            findClient: findClientUseCase,
        });

        return clientFacade;
    }
}