import { UserEntity } from "../entities/UserEntity";
import { PostEntity } from "../entities/PostEntity";
import { FollowEntity } from "../entities/FolllowEntity";
import { CommentEntity } from "../entities/CommentEntity";
import { LikeEntity } from "../entities/LikeEntity";

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
        text: "test",
        image_url: "https://a.ppy.sh/2",
        name: "test",
        user_id: user.id
    });
    /*
    let follow = await FollowEntity.create({
        subscriber_id: 1,
        target_id: user.id
    });
    let comment = await CommentEntity.create({
        content: "test",
        author_id: user.id,
        post_id: post.id
    });
    let like = await LikeEntity.create({
        author_id: user.id,
        post_id: post.id
    });*/
    return;
}