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
            address: "Street 1, SW MockCity",
        };

        const result = await usecase.execute(input);

        expect(result.id).toBeDefined();
        expect(result.name).toBe("John");
        expect(result.address).toBe("Street 1, SW MockCity");


    })
    
})