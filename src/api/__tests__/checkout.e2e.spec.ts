
import request from 'supertest';
import { ProductRegistrationModel } from '../../modules/product-adm/repository/product.model';
import { migrator } from '../../test-migrations/config-migrations/migrator';
import { createApp } from '../express';
import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../modules/store-catalog/repository/product.model';
import OrderModel from '../../modules/checkout/repository/order.model';
import OrderProductModel from '../../modules/checkout/repository/order-product.model';
import ClientModel from '../../modules/client-adm/repository/client.model';
import TransactionModel from '../../modules/payment/repository/transaction.model';
import InvoiceModel from '../../modules/invoice/repository/invoice.model';
import InvoiceItemsModel from '../../modules/invoice/repository/invoice.items.model';


describe("E2E test for checkout", () => {
    let sequelize: Sequelize;
    let app: ReturnType<typeof createApp>;
    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        });

        await sequelize.addModels([ProductRegistrationModel, ProductModel, OrderProductModel, OrderModel, ClientModel, TransactionModel, InvoiceModel, InvoiceItemsModel])

        const umzug = migrator(sequelize);
        await umzug.up();
        app = createApp(sequelize);

    });


    afterEach(async () => {
        const umzug = migrator(sequelize);
        await umzug.down();
        await sequelize.close();
    });

    it("should place an order", async () => {

       await ClientModel.create({
            id: "1c",
            name: "Client 0",
            document: "0000",
            email: "client@user.com",
            street: "some address",
            number: 1,
            complement: "",
            city: "some city",
            state: "some state",
            zipCode: "000",
            createdAt: new Date(),
            updatedAt: new Date(),
       });

       await ProductModel.bulkCreate([
            {
                id: "1",
                name: "Product 1",
                description: "Desc 1",
                salesPrice: 100,
            },
            {
                id: "2",
                name: "Product 2",
                description: "Desc 2",
                salesPrice: 100,
            },
        ]);

        await ProductRegistrationModel.update(
            { stock: 120, purchasePrice: 10 },
            { where: { id: "1" } }
        );

        await ProductRegistrationModel.update(
            { stock: 120, purchasePrice: 10 },
            { where: { id: "2" } }
        );

        // await TransactionModel.create({
        //     id: "1",
        //     orderId: "2",
        //     amount: 20,
        //     createdAt: new Date(),
        //     updatedAt: new Date(),
        // });


        const response = await request(app)
            .post("/checkout")
            .send({
                clientId: "1c",
                products: [{productId: "1"}, {productId: "2"}]
            });

        expect(response.status).toBe(200);
        // expect(response.body.name).toBe("John");
        // expect(response.body.email).toBe("john@email.com")
        // expect(response.body.document).toBe("00001");
        // expect(response.body.street).toBe("Street 1");
        // expect(response.body.number).toBe(12);
        // expect(response.body.complement).toBe("12");
        // expect(response.body.city).toBe("mock city");
        // expect(response.body.state).toBe("mock state");
        // expect(response.body.zipCode).toBe("1233");

    });

    it("should not create a product", async () => {
        const response = await request(app)
            .post("/clients")
            .send({
                clientId: "",
            });

        expect(response.status).toBe(500);
    });
});