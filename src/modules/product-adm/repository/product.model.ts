import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    modelName: "product-registration-table",
    tableName: "products",
    timestamps: false,
})
export class ProductRegistrationModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column({ allowNull: false})
    declare name: string;

    @Column({ allowNull: false})
    declare description: string;

    @Column({ allowNull: false})
    declare purchasePrice: number;

    @Column({ allowNull: false})
    declare stock: number;

}