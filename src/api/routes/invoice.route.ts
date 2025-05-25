import express, {Request, Response} from 'express';
import InvoiceFacadeFactory from '../../modules/invoice/factory/invoice.factory';

export const invoiceRoute = express.Router();

invoiceRoute.get("/", async (req: Request, res: Response) => {
    const invoiceFacade = InvoiceFacadeFactory.create();

    try {

        const invoiceDto = {
            id: req.body.id
        };

        const output = await invoiceFacade.find(invoiceDto);
        res.send(output);


    } catch (err) {
        res.status(500).send(err);
    }
});