import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import OrderModel from "./order.model";
import ProductModel from "../../store-catalog/repository/product.model";

@Table({
    tableName: "order_products",
    timestamps: false,
})
export default class OrderProductModel extends Model {
    @ForeignKey(() => OrderModel)
    @Column({ field: "order_id" })
    declare orderId: string;

    @ForeignKey(() => ProductModel)
    @Column({field: "product_id"})
    declare productId: string;
}