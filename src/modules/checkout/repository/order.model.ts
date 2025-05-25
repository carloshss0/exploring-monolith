import { BelongsToMany, Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import ProductModel from "../../store-catalog/repository/product.model";
import OrderProductModel from "./order-product.model";

@Table({
    tableName: "orders",
    timestamps: false,
})
export default class OrderModel extends Model {

    @PrimaryKey
    @Column({allowNull: false})
    declare id: string;

    @Column({allowNull: false, field: "client_id"})
    declare clientId: string;

    @Column({allowNull: false})
    declare status: string;

    @Column({allowNull: false})
    declare total: number;

    @BelongsToMany(() => ProductModel, () => OrderProductModel)
    declare products: ProductModel[];




}