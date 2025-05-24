import { Sequelize } from "sequelize-typescript";
import ClientModel from "./client.model";
import { string } from "yup";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import ClientRepository from "./client.repository";

describe("Client Repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true},
        });

        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    })

    it("Should create a client", async () => {
        
        const clientRepository = new ClientRepository();

        const clientProps = {
            id: new Id("1"),
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

        const client = new Client(clientProps);

        await clientRepository.add(client);

        
        const clientDb = await ClientModel.findOne({
            where: {id: clientProps.id.id}
        });

        expect(clientProps.id.id).toEqual(clientDb?.id);
        expect(clientProps.name).toEqual(clientDb?.name);
        expect(clientProps.email).toEqual(clientDb?.email);
        expect(clientProps.document).toEqual(clientDb?.document);
        expect(clientProps.street).toEqual(clientDb?.street);
        expect(clientProps.number).toEqual(clientDb?.number);
        expect(clientProps.complement).toEqual(clientDb?.complement);
        expect(clientProps.city).toEqual(clientDb?.city);
        expect(clientProps.state).toEqual(clientDb?.state);
        expect(clientProps.zipCode).toEqual(clientDb?.zipCode);
        


    })

    it("Should find a client", async () => {
        const clientRepository = new ClientRepository();

        const clientProps = {
            id: new Id("1"),
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

        const client = new Client(clientProps);

        await clientRepository.add(client);

        const result = await clientRepository.find(clientProps.id.id);
        
        expect(result.id.id).toBe(clientProps.id.id);
        expect(result.name).toEqual(clientProps.name);
        expect(result.email).toEqual(clientProps.email);
        expect(clientProps.document).toEqual(clientProps.document);
        expect(clientProps.street).toEqual(clientProps.street);
        expect(clientProps.number).toEqual(clientProps.number);
        expect(clientProps.complement).toEqual(clientProps.complement);
        expect(clientProps.city).toEqual(clientProps.city);
        expect(clientProps.state).toEqual(clientProps.state);
        expect(clientProps.zipCode).toEqual(clientProps.zipCode);
    })


})