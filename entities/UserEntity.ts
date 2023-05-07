import { Table, Model, Column, DataType, BeforeCreate } from "sequelize-typescript";
import { hashPassword, verifyPassword } from "../services/hashing";

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

    async validatePassword(password: string): Promise<boolean> {
        return await verifyPassword(password, this.password);
    }

}

