import express, { Express } from "express";
import { productRoute } from "./routes/product.route";
import { Sequelize } from "sequelize-typescript";
import { ProductRegistrationModel } from "../modules/product-adm/repository/product.model";
import ClientModel from "../modules/client-adm/repository/client.model";
import { clientRoute } from "./routes/client.route";
import { checkOutRoute } from "./routes/checkout.route";
import OrderModel from "../modules/checkout/repository/order.model";
import OrderProductModel from "../modules/checkout/repository/order-product.model";
import ProductModel from "../modules/store-catalog/repository/product.model";
import { invoiceRoute } from "./routes/invoice.route";
import InvoiceModel from "../modules/invoice/repository/invoice.model";
import InvoiceItemsModel from "../modules/invoice/repository/invoice.items.model";
import TransactionModel from "../modules/payment/repository/transaction.model";


export function createApp(sequelize: Sequelize): Express {
    const app = express();
    app.use(express.json());
    app.use("/products", productRoute);
    app.use("/clients", clientRoute);
    app.use("/checkout", checkOutRoute);
    app.use("/invoices", invoiceRoute);

    sequelize.addModels([
        ClientModel,
        ProductRegistrationModel,
        OrderModel,
        OrderProductModel,
        ProductModel,
        InvoiceModel,
        InvoiceItemsModel,
        TransactionModel
    ]);

    return app;
}
