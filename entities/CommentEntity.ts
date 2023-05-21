import { Table, Model, Column, DataType, BeforeCreate, BelongsTo } from "sequelize-typescript";
import { PostEntity } from "./PostEntity";

@Table({
    timestamps: true,
    tableName: "Comments",
  })
export class CommentEntity extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    user_id!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    post_id!: number;

    //@BelongsTo(() => PostEntity, { foreignKey: "post_id" })
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    text!: string;
}

