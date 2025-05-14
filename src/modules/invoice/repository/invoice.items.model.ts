import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import type InvoiceModel from "./invoice.model";
// import InvoiceModel from "./invoice.model";


@Table({
    tableName: "invoices_items",
    timestamps: false,
})
export default class InvoiceItemsModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false})
    declare id: string;
    
    @Column({ allowNull: false})
    declare name: string;

    @Column({ allowNull: false})
    declare price: number;

    @ForeignKey(() => require("./invoice.model").default)
    @Column
    declare invoiceId: string;

    @BelongsTo(() => require("./invoice.model").default)
    declare invoice: InvoiceModel;

}