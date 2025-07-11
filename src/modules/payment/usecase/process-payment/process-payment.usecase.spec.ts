import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usecase";

const transaction = new Transaction({
    id: new Id("1"),
    amount: 100,
    orderId: "1",
})

const MockRepository = () => {
    return {
        save: jest.fn().mockImplementation(async (transaction) => {
            return transaction
        }),
    }

}

describe("Process payment usecase unit test", () => {
    it("Should approve a transaction", async () => {
        const paymentRepository = MockRepository();
        const usecase = new ProcessPaymentUseCase(paymentRepository);

        const input = {
            orderId: "1",
            amount: 100,
        }

        const result = await usecase.execute(input);

        expect(result.transactionId).toBeDefined();
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.status).toBe("approved");
        expect(result.amount).toBe(100);
        expect(result.orderId).toBe("1");
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
    });


    it("Should not approve a transaction", async () => {
        const paymentRepository = MockRepository();
        const usecase = new ProcessPaymentUseCase(paymentRepository);

        const input = {
            orderId: "1",
            amount: 99,
        }

        const result = await usecase.execute(input);

        expect(result.transactionId).toBeDefined();
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.status).toBe("declined");
        expect(result.amount).toBe(99);
        expect(result.orderId).toBe("1");
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
    })
})