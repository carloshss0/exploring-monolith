import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import ProductAdmFacadeFactory from "../factory/facade.factory";
import Product from "../domain/product.entity";


describe("ProductAdmFacade test", () => {
    let sequelize: Sequelize;
    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true}
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach( async () => {
        await sequelize.close();
    });

    it("Should create a product", async () => {

        const productFacade = ProductAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10,
        };

        await productFacade.addProduct(input);

        const product = await ProductModel.findOne({
            where: { id: input.id },
        });

        expect(product).toBeDefined();
        expect(product!.id).toBe("1");
        expect(product!.name).toBe("Product 1");
        expect(product!.description).toBe("Product 1 description");
        expect(product!.purchasePrice).toBe(100);
        expect(product!.stock).toBe(10);

    });

    it("Should get the stock for a product", async () => {
        const productFacade = ProductAdmFacadeFactory.create();
        const inputCreate = {
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10,
        };

        await productFacade.addProduct(inputCreate);

        const inputCheckStock = {
            productId: "1",
        }

        const result = await productFacade.checkStock(inputCheckStock);
        
        expect(result.productId).toBe(inputCreate.id);
        expect(result.stock).toBe(inputCreate.stock);
    })
});