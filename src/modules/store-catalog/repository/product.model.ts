import { BelongsToMany, Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderModel from "../../checkout/repository/order.model";
import OrderProductModel from "../../checkout/repository/order-product.model";

@Table({
    modelName: "products-table",
    tableName: "products",
    timestamps: false,
})
export default class ProductModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    declare id: string;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare description: string;

    @Column({allowNull: false})
    declare salesPrice: number;

    @BelongsToMany(() => OrderModel, () => OrderProductModel)
    declare orders: OrderModel[];

    
}