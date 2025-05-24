import { IsEmail } from "sequelize-typescript";
import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {

    return {
        add: jest.fn(),
        find: jest.fn(),
    }
}

describe("Add client usecase unit test", () => {
    it ("Should create a client", async () => {
        const clientRepository = MockRepository();

        const usecase = new AddClientUseCase(clientRepository);

        const input = {
            name: "John",
            email: "john@gmail.com",
            document: "0000",
            street: "some address",
            number: 1,
            complement: "",
            city: "some city",
            state: "some state",
            zipCode: "000",
        };

        const result = await usecase.execute(input);

        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.document).toEqual(input.document);
        expect(result.street).toEqual(input.street);
        expect(result.number).toEqual(input.number);
        expect(result.complement).toEqual(input.complement);
        expect(result.city).toEqual(input.city);
        expect(result.state).toEqual(input.state);
        expect(result.zipCode).toEqual(input.zipCode);


    })
    
})