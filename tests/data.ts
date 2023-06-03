import { UserEntity } from "../entities/UserEntity";
import { PostEntity } from "../entities/PostEntity";
import { FollowEntity } from "../entities/FolllowEntity";
import { CommentEntity } from "../entities/CommentEntity";
import { LikeEntity } from "../entities/LikeEntity";
import { test } from "node:test";
import { assert } from "node:console";

/*
    create a user if doesnt exist
    create a post
    follow Admin
    like post as Admin
    comment post as Admin
*/
export async function createTestRecords() {
    let userExists = await UserEntity.findOne({ where: { username: "test" } });
    if (userExists){
        UserEntity.destroy({ where: { username: "test" } });
        PostEntity.destroy({ where: { name: "test" } });
        CommentEntity.destroy({ where: { text: "test comment" } });
    }
    let user = await UserEntity.create({
        username: "test",
        email: "testemail",
        password: "test",
        avatar_url: "https://a.ppy.sh/3",
        background_url: "testbg",
        nickName: "testnick",
        description: "test account to rule the js and ts world"
    });
    let post = await PostEntity.create({
        text: "testing post lol",
        image_url: "https://a.ppy.sh/2",
        name: "test",
        user_id: user.id
    });
    /*
    let follow = await FollowEntity.create({
        subscriber_id: 1,
        target_id: user.id
    });
    */
    let comment = await CommentEntity.create({
        text: "test comment",
        user_id: user.id,
        post_id: post.id
    });

    let testuser = await UserEntity.findOne({ where: { username: "test" } });
    let postsoftestuser = await testuser?.$get("posts");
    if(postsoftestuser == undefined)
        return;
    let postoftestuser = postsoftestuser[0];
    let comments = await postoftestuser.$get("comments");
    let commentoftestuser = comments[0];

    //try to create a like
    postoftestuser.$create("like", { user_id: user.id });
    let like = await postoftestuser.$get("likes");
    if(like == undefined)
        return;
    console.log(postoftestuser.dataValues);
    console.log(commentoftestuser.dataValues);
    if(like[0] == undefined)
        return;
    console.log(like[0].dataValues);
    assert(postoftestuser.name == "test");
    /*
    let like = await LikeEntity.create({
        author_id: user.id,
        post_id: post.id
    });*/
    return;
}