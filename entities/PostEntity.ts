import { Table, Model, Column, DataType, BeforeCreate, HasOne, BelongsTo, HasMany } from "sequelize-typescript";
import { UserEntity } from "./UserEntity";
import { CommentEntity } from "./CommentEntity";
import { LikeEntity } from "./LikeEntity";

@Table({
    timestamps: true,
    tableName: "Posts",
  })
export class PostEntity extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    user_id!: number;

    //@BelongsTo(() => UserEntity)
    //user!: UserEntity;å
    @HasMany(() => CommentEntity, { foreignKey: "post_id"})
    comments!: CommentEntity[];

    @HasMany(() => LikeEntity, { foreignKey: "post_id"})
    likes!: LikeEntity[];

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    text!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    image_url!: string;
}

