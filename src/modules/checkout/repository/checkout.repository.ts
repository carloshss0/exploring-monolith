import Id from "../../@shared/domain/value-object/id.value-object";
import ClientFacadeFactory from "../../client-adm/factory/facade.factory";
import ProductModel from "../../store-catalog/repository/product.model";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import OrderProductModel from "./order-product.model";
import OrderModel from "./order.model";

export default class CheckOutRepository implements CheckoutGateway {
    async addOrder(order: Order): Promise<void> {
        const createOrder = await OrderModel.create({
            id: order.id.id,
            clientId: order.client.id.id,
            status: order.status,
            total: order.total,
            // products: order.products.map((product) => {
            //     return {
            //         id: product.id.id,
            //         orderId: order.id.id,
            //         name: product.name,
            //         description: product.description,
            //         salesPrice: product.salesPrice,
            //     }
            // })

        });

        await createOrder.$set('products', order.products.map(p => p.id.id));

    }

    async findOrder(id: string): Promise<Order | null> {
        const orderData = await OrderModel.findOne({
            where: {id},
            include: ["products"]
        });

        if(!orderData) return null;

        const products = orderData.products.map((product) => {
            return new Product({
                id: new Id(product.id),
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice,
            })
        });

        const clientFacade = ClientFacadeFactory.create()

        const findClientFacadeOutputDto = await clientFacade.findClient({id: orderData.clientId});

        const client = new Client({
            id: new Id(findClientFacadeOutputDto.id),
            name: findClientFacadeOutputDto.name,
            email: findClientFacadeOutputDto.email,
            address: findClientFacadeOutputDto.street,
        });

        return new Order({
            id: new Id(orderData.id),
            client: client,
            products: products,
            status: orderData.status,
        });
    }
    
}