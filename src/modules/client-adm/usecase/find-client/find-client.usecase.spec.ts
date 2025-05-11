import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

const client = new Client({
    id: new Id("1"),
    name: "John",
    email: "john@email.com",
    address: "Street 1, SW MockCity",
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client)),
    };
};


describe("Find Client usecase unit test", () => {
    it("Should find a client", async () => {
        const clientRepository = MockRepository();

        const usecase = new FindClientUseCase(clientRepository);

        const input = {id: "1"}

        const result = await usecase.execute(input);

        expect(clientRepository.find).toHaveBeenCalled();
        expect(result.id).toBe("1");
        expect(result.name).toBe("John");
        expect(result.email).toBe("john@email.com");
        expect(result.address).toBe("Street 1, SW MockCity");
    })
})