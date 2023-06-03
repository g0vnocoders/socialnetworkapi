import { Sequelize } from "sequelize-typescript";
import { UserEntity } from "./entities/UserEntity";
import { PostEntity } from "./entities/PostEntity";
import { CommentEntity } from "./entities/CommentEntity";
import { LikeEntity } from "./entities/LikeEntity";
import { FollowEntity } from "./entities/FolllowEntity";

let connection: Sequelize;
//run sqlite if development
if(false){
    connection = new Sequelize({
        database: "db",
        dialect: "sqlite",
        storage: "sqlite.db",
        models: [UserEntity, PostEntity, CommentEntity, LikeEntity],
        logging: false
    });
}
else{
    //run postgres if production
    connection = new Sequelize({
        database: "socialnetwork",
        dialect: "postgres",
        username: "root",
        password: "root",
        host: "sudohub.dev",
        port: 5432,
        models: [UserEntity, PostEntity, CommentEntity, LikeEntity],
        logging: false
    });
}

export { connection };