import { Sequelize } from "sequelize-typescript"
import Product from "../domain/product.entity";
import { ProductRegistrationModel } from "./product.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import ProductRepository from "./product.repository";

describe("ProductRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true}
        });

        await sequelize.addModels([ProductRegistrationModel]);
        await sequelize.sync();
    });

    afterEach( async () => {
        await sequelize.close();
    })

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const productProps = {
            id: new Id("1"),
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10,
        }
        const product = new Product(productProps);
        const result = await productRepository.add(product);

        const productDb = await ProductRegistrationModel.findOne({
            where: {id: productProps.id.id}
        });

        expect(productProps.id.id).toEqual(productDb?.id);
        expect(productProps.name).toEqual(productDb?.name);
        expect(productProps.description).toEqual(productDb?.description);
        expect(productProps.purchasePrice).toEqual(productDb?.purchasePrice);
        expect(productProps.stock).toEqual(productDb?.stock);


    })

    it("should find a product", async () => {
        const productRepository = new ProductRepository();

        ProductRegistrationModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const product = await productRepository.find("1");

        expect(product.id.id).toEqual("1");
        expect(product.name).toEqual("Product 1");
        expect(product.description).toEqual("Product 1 description");
        expect(product.purchasePrice).toEqual(100);
        expect(product.stock).toEqual(10);

    })

})