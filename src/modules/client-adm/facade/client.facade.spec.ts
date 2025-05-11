import { Sequelize } from "sequelize-typescript";
import ClientModel from "../repository/client.model";
import ClientFacadeFactory from "../factory/facade.factory";

describe("ClientFacade test", () => {
    let sequelize: Sequelize;
    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true}
        });

        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach( async () => {
        await sequelize.close();
    });

    it("Should create a client", async () => {
        const clientFacade = ClientFacadeFactory.create();
        
        const input = {
            id: "1",
            name: "John",
            email: "john@email.com",
            address: "Street 1, SW MockCity",
        };

        await clientFacade.addClient(input);

        const client = await ClientModel.findOne({
            where: { id: input.id },
        });

        expect(client).toBeDefined();
        expect(client!.id).toBe("1");
        expect(client!.name).toBe("John");
        expect(client!.email).toBe("john@email.com");
        expect(client!.address).toBe("Street 1, SW MockCity");
    });

    it("Should find a client", async () => {
        const clientFacade = ClientFacadeFactory.create();
        const input = {
            id: "1",
            name: "John",
            email: "john@email.com",
            address: "Street 1, SW MockCity",
        };

        await clientFacade.addClient(input);

        const inputFindClient = {
            id: "1",
        }

        const result = await clientFacade.findClient(inputFindClient);
        
        expect(result.id).toBe("1");
        expect(result.name).toBe("John");
        expect(result.email).toBe("john@email.com");
        expect(result.address).toBe("Street 1, SW MockCity");
    })

})