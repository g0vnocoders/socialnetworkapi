import { Table, Model, Column, DataType, BeforeCreate, HasMany, BelongsToMany } from "sequelize-typescript";
import { hashPassword, verifyPassword } from "../services/hashing";
import { PostEntity } from "./PostEntity";
import { FollowEntity } from "./FolllowEntity";

@Table({
    timestamps: false,
    tableName: "Users",
  })
export class UserEntity extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    username!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    nickName!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password!: string;
    //hashing hook
    @BeforeCreate
    static async hashPasswordHook(instance: UserEntity) {
        instance.password = await hashPassword(instance.password);
    }

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    email!: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    is_admin!: boolean;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: ""
    })
    avatar_url!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: ""
    })
    background_url!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: ""
    })
    description!: string;

    @HasMany(() => PostEntity, { foreignKey: "user_id" })
    posts!: PostEntity[];

    //followings
    //@BelongsToMany(() => UserEntity, () => FollowEntity, "subscriber_id", "target_id")

    async validatePassword(password: string): Promise<boolean> {
        return await verifyPassword(password, this.password);
    }

}

