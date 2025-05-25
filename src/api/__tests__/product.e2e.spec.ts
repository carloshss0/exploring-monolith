import { Sequelize } from 'sequelize-typescript';
import { createApp } from '../express';
import request from 'supertest';
import { ProductRegistrationModel } from '../../modules/product-adm/repository/product.model';
import { migrator } from '../../test-migrations/config-migrations/migrator';
import { Umzug } from 'umzug';

describe("E2E test for product", () => {
    let sequelize: Sequelize;
    let app: ReturnType<typeof createApp>;
    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        });

        await sequelize.addModels([ProductRegistrationModel])

        const umzug = migrator(sequelize);
        await umzug.up();

        app = createApp(sequelize);
    });

    afterAll(async () => {
        const umzug = migrator(sequelize);
        await umzug.down();
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Pepsi",
                description: "Refrigerant",
                purchasePrice: 17.69,
                stock: 12
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Pepsi");
        expect(response.body.description).toBe("Refrigerant")
        expect(response.body.purchasePrice).toBe(17.69);
        expect(response.body.stock).toBe(12);

    });

    it("should not create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Pepsi",
            });

        expect(response.status).toBe(500);
    });
});