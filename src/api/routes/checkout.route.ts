import express, {Request, Response} from 'express';
import CheckStockUseCase from '../../modules/product-adm/usecase/check-stock/check-stock.usecase';
import PlaceOrderUseCase from '../../modules/checkout/usecase/place-order/place-order.usecase';
import ClientFacadeFactory from '../../modules/client-adm/factory/facade.factory';
import ProductAdmFacadeFactory from '../../modules/product-adm/factory/facade.factory';
import StoreCatalogFacadeFactory from '../../modules/store-catalog/factory/facade.factory';
import CheckOutRepository from '../../modules/checkout/repository/checkout.repository';
import InvoiceFacadeFactory from '../../modules/invoice/factory/invoice.factory';
import PaymentFacadeFactory from '../../modules/payment/factory/payment.facade.factory';
import { PlaceOrderInputDto } from '../../modules/checkout/usecase/place-order/place-order.dto';



export const checkOutRoute = express.Router();


checkOutRoute.post("/", async (req: Request, res: Response) => {
    const usecase = new PlaceOrderUseCase(
        ClientFacadeFactory.create(),
        ProductAdmFacadeFactory.create(),
        StoreCatalogFacadeFactory.create(),
        new CheckOutRepository(),
        InvoiceFacadeFactory.create(),
        PaymentFacadeFactory.create()
    )
    
    try {

        const products: PlaceOrderInputDto['products'] = req.body.products

        const placeOrderInputDto: PlaceOrderInputDto = {
            clientId: req.body.clientId,
            products: products,
            };


        const output = await usecase.execute(placeOrderInputDto);
        res.send(output);


    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});