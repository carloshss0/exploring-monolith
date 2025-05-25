
import request from 'supertest';
import { createApp } from '../express';
import { Sequelize } from 'sequelize-typescript';
import ClientModel from '../../modules/client-adm/repository/client.model';
import { migrator } from '../../test-migrations/config-migrations/migrator';
 

describe("E2E test for client", () => {
    let sequelize: Sequelize;
    let app: ReturnType<typeof createApp>;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
        });
        await sequelize.addModels([ClientModel]);
        const umzug = migrator(sequelize);
        await umzug.up();
        
        app = await createApp(sequelize);
    });

    afterAll(async () => {
        const umzug = migrator(sequelize);
        await umzug.down();
        await sequelize.close();
    });

    it("should create a client", async () => {
        const response = await request(app)
            .post("/clients")
            .send({
                name: "John",
                email: "john@email.com",
                document: "00001",
                street: "Street 1",
                number: 12,
                complement: "12",
                city: "mock city",
                state: "mock state",
                zipCode: "1233"
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John");
        expect(response.body.email).toBe("john@email.com")
        expect(response.body.document).toBe("00001");
        expect(response.body.street).toBe("Street 1");
        expect(response.body.number).toBe(12);
        expect(response.body.complement).toBe("12");
        expect(response.body.city).toBe("mock city");
        expect(response.body.state).toBe("mock state");
        expect(response.body.zipCode).toBe("1233");

    });

    it("should not create a product", async () => {
        const response = await request(app)
            .post("/clients")
            .send({
                name: "John",
            });

        expect(response.status).toBe(500);
    });
});