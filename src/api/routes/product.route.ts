import express, {Request, Response} from 'express';
import ProductAdmFacadeFactory from '../../modules/product-adm/factory/facade.factory';

export const productRoute = express.Router();


productRoute.post("/", async (req: Request, res: Response) => {
    const productFacade = ProductAdmFacadeFactory.create();
    // const usecase = new AddProductUseCase(new ProductRepository());
    
    try {

        const { name, description, purchasePrice, stock } = req.body;

        const productDto = {
            name: name,
            description: description,
            purchasePrice: purchasePrice,
            stock: stock,
        };

        const output = await productFacade.addProduct(productDto);
        res.send(output);


    } catch (err) {
        res.status(500).send(err);
    }
});