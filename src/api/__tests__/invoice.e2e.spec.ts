
import { Sequelize } from 'sequelize-typescript';
import request from 'supertest';
import { createApp } from '../express';
import InvoiceModel from '../../modules/invoice/repository/invoice.model';
import InvoiceItemsModel from '../../modules/invoice/repository/invoice.items.model';
import { migrator } from '../../test-migrations/config-migrations/migrator';


describe("E2E test for invoice", () => {
    let sequelize: Sequelize;
    let app: ReturnType<typeof createApp>;
    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        });

        await sequelize.addModels([ InvoiceModel, InvoiceItemsModel])

        const umzug = migrator(sequelize);
        await umzug.up();
        app = createApp(sequelize);

    });


    afterEach(async () => {
        const umzug = migrator(sequelize);
        await umzug.down();
        await sequelize.close();
    });

    it("should get an invoice", async () => {

        await InvoiceModel.create(
            {
                id: "1",
                name: "Invoice",
                document: "0000",
                address: {
                    street: "street",
                    number: 12,
                    complement: "",
                    city: "city",
                    state: "state",
                    zipCode: "00123"
                },
                items: [
                    {
                        id: "1c",
                        name: "product 1",
                        price: 100,
                    }
                ],
                total: 100,
                createdAt: new Date(),
                updatedAt: new Date(),
            },{
                include: [InvoiceItemsModel],
            }
        );

        const response = await request(app)
            .get("/invoices")
            .send({
                id: "1",
            });
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe("1");
        expect(response.body.name).toBe("Invoice");
        expect(response.body.document).toBe("0000");
        expect(response.body.address.street).toBe("street");
        expect(response.body.address.number).toBe(12);
        expect(response.body.address.complement).toBe("");
        expect(response.body.address.city).toBe("city");
        expect(response.body.address.state).toBe("state");
        expect(response.body.address.zipCode).toBe("00123");
        expect(response.body.items.length).toBe(1);
        expect(response.body.items[0].id).toBe("1c");
        expect(response.body.items[0].name).toBe("product 1");
        expect(response.body.items[0].price).toBe(100);
        expect(response.body.total).toBe(100);
    });

    it("should not get an invoice", async () => {
        const response = await request(app)
            .get("/invoices")
            .send({
                id: "1",
        });

        expect(response.status).toBe(500);
         
    });
});