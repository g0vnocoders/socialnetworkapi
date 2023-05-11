import { Table, Model, Column, DataType, BeforeCreate, HasOne, BelongsTo } from "sequelize-typescript";
import { UserEntity } from "./UserEntity";
import { PostEntity } from "./PostEntity";

@Table({
    timestamps: true,
    tableName: "Likes",
  })
export class LikeEntity extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    user_id!: number;

    @HasOne(() => UserEntity)

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    post_id!: number;

    @BelongsTo(() => PostEntity)

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true
    })
    is_post!: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true
    })
    is_like!: boolean;
}

