import { Table, Model, Column, DataType, BeforeCreate } from "sequelize-typescript";

@Table({
    timestamps: false,
    tableName: "Follows",
  })
export class FollowEntity extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    subscriber_id!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    target_id!: number;
}

