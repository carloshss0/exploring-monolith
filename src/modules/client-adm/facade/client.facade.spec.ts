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
            document: "0000",
            street: "some address",
            number: 1,
            complement: "",
            city: "some city",
            state: "some state",
            zipCode: "000",
        };

        await clientFacade.addClient(input);

        const client = await ClientModel.findOne({
            where: { id: input.id },
        });

        expect(client).toBeDefined();
        expect(client!.id).toBe("1");
        expect(client!.name).toBe("John");
        expect(client!.email).toBe("john@email.com");
        expect(client!.document).toEqual("0000");
        expect(client!.street).toEqual("some address");
        expect(client!.number).toEqual(1);
        expect(client!.complement).toEqual("");
        expect(client!.city).toEqual("some city");
        expect(client!.state).toEqual("some state");
        expect(client!.zipCode).toEqual("000");
    });

    it("Should find a client", async () => {
        const clientFacade = ClientFacadeFactory.create();
        const input = {
            id: "1",
            name: "John",
            email: "john@email.com",
            document: "0000",
            street: "some address",
            number: 1,
            complement: "",
            city: "some city",
            state: "some state",
            zipCode: "000",
        };

        await clientFacade.addClient(input);

        const inputFindClient = {
            id: "1",
        }

        const result = await clientFacade.findClient(inputFindClient);
        
        expect(result.id).toBe("1");
        expect(result.name).toBe("John");
        expect(result.email).toBe("john@email.com");
        expect(result.document).toEqual("0000");
        expect(result.street).toEqual("some address");
        expect(result.number).toEqual(1);
        expect(result.complement).toEqual("");
        expect(result.city).toEqual("some city");
        expect(result.state).toEqual("some state");
        expect(result.zipCode).toEqual("000");
    })

})