import { Sequelize } from "sequelize-typescript";
import { UserEntity } from "./entities/UserEntity";
import { PostEntity } from "./entities/PostEntity";
import { CommentEntity } from "./entities/CommentEntity";
import { LikeEntity } from "./entities/LikeEntity";
import { FollowEntity } from "./entities/FolllowEntity";

let connection: Sequelize;
//run sqlite if development
if(true){
    connection = new Sequelize({
        database: "db",
        dialect: "sqlite",
        storage: "sqlite.db",
        models: [UserEntity, PostEntity],
        logging: false
    });
}
else{
    //run postgres if production
    connection = new Sequelize({
        database: "d7q4q4q3q3q3q3",
        dialect: "postgres",
        username: "jvqjwqjwqjwqjw",
        password: "d7q4q4q3q3q3q3",
        host: "ec2-54-217-235-166.eu-west-1.compute.amazonaws.com",
        port: 5432,
        models: [UserEntity],
        logging: false
    });
}

export { connection };