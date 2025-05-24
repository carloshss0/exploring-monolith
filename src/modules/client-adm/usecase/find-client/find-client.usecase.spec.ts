import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

const client = new Client({
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
        expect(result.document).toEqual("0000");
        expect(result.street).toEqual("some address");
        expect(result.number).toEqual(1);
        expect(result.complement).toEqual("");
        expect(result.city).toEqual("some city");
        expect(result.state).toEqual("some state");
        expect(result.zipCode).toEqual("000");
    })
})