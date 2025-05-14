import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceItemsModel from "./invoice.items.model";


@Table({
    tableName: "invoices",
    timestamps: false,
})
export default class InvoiceModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false})
    declare id: string;
    
    @Column({ allowNull: false, field: "order_id"})
    declare name: string;


    @Column({ allowNull: false})
    declare document: string;

    @Column({ allowNull: false, type: DataType.JSON})
    declare address: {
        street: string;
        number: number;
        complement: string;
        city: string;
        state: string;
        zipCode: string;
    };

    @HasMany(() => InvoiceItemsModel)
    declare items: InvoiceItemsModel[];


    @Column({ allowNull: false, field: "created_at"})
    declare createdAt: Date;


    @Column({ allowNull: false, field: "updated_at"})
    declare updatedAt: Date;

    @Column({ allowNull: false})
    declare total: number;
}