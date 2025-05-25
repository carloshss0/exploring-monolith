import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckOutRepository from "./checkout.repository";
import OrderModel from "./order.model";
import ProductModel from "../../store-catalog/repository/product.model";
import OrderProductModel from "./order-product.model";
import { migrator } from "../../../test-migrations/config-migrations/migrator";
import { ProductRegistrationModel } from "../../product-adm/repository/product.model";
import ClientModel from "../../client-adm/repository/client.model";

describe("Test CheckoutRepository", () => {
    let sequelize: Sequelize;
    const clientProps = {
            id: new Id("1c"),
            name: "Client 0",
            email: "client@email.com",
            address: "some address",

        };
    
    const client = new Client(clientProps);

    const product = new Product({
        name: "Product 1",
        description: "Desc 1",
        salesPrice: 100,
    });

    const order = new Order({
        client: client,
        products: [product],
    });

    const order_id = order.id.id;
    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        });

        await sequelize.addModels([ProductModel, OrderProductModel, OrderModel, ProductRegistrationModel, ClientModel])

        const umzug = migrator(sequelize);
        await umzug.up();


        await ClientModel.create({
            id: "1c",
            name: "Client 0",
            document: "0000",
            email: "client@email.com",
            street: "some address",
            number: 1,
            complement: "",
            city: "some city",
            state: "some state",
            zipCode: "000",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        

        await ProductModel.create(
            {
                id: product.id.id,
                name: "Product 1",
                description: "Desc 1",
                salesPrice: 100,
            }
        );

        await ProductRegistrationModel.update(
            { stock: 120, purchasePrice: 10 },
            { where: { id: product.id.id } }
        );
    })

    afterEach(async () => {
        const umzug = migrator(sequelize);
        await umzug.down();
        await sequelize.close();
    });
    it("should add an order", async () => {

        const checkoutRepository = new CheckOutRepository();
        
        await checkoutRepository.addOrder(order);
        
        

        const orderDb = await OrderModel.findOne({
            where: { id: order_id },
            include: [ProductModel]
        });

        expect(order.id.id).toBe(orderDb?.id);
        expect(order.client.id.id).toBe(orderDb?.clientId);
        expect(order.products[0].name).toBe(orderDb?.products[0].name);
        expect(order.products[0].description).toBe(orderDb?.products[0].description);
        expect(order.products[0].salesPrice).toBe(orderDb?.products[0].salesPrice);
        
    });

    it("should find an order", async() => {


        const checkoutRepository = new CheckOutRepository();

        await checkoutRepository.addOrder(order);

        const result = await checkoutRepository.findOrder(order_id);
        expect(result?.id.id).toBe(order_id);
        expect(result?.client.id.id).toBe(order.client.id.id);
        expect(result?.client.email).toBe(order.client.email);
        expect(result?.client.address).toBe(order.client.address);
        expect(result?.client.name).toBe(order.client.name);
        expect(result?.products.length).toBe(1);
        expect(result?.products[0].id.id).toBe(order.products[0].id.id);
        expect(result?.products[0].name).toBe(order.products[0].name);
        expect(result?.products[0].description).toBe(order.products[0].description);
        expect(result?.products[0].salesPrice).toBe(order.products[0].salesPrice);

    })
})