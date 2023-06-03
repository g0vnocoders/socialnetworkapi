import { UserModel } from './../models/UserModel';
import { UserEntity } from '../entities/UserEntity';
import { FollowEntity } from '../entities/FolllowEntity';
import { FollowInfo } from '../models/FollowInfo';
import { PostEntity } from '../entities/PostEntity';
import { MinUserModel } from '../models/MinUserModel';
import { MinPostModel } from '../models/MinPostModel';

export async function getUsers(){
    const users = await UserEntity.findAll();
    const userModels: MinUserModel[] = users.map(user => ({
        id: user.id,
        name: user.nickName,
        email: user.email,
        avatarURL: user.avatar_url
    }));
    return userModels;
}


export async function getUserInfo(user_id:Number) {
    let user_account: UserEntity|null = await UserEntity.findOne({ where: { id: user_id } });
    if (!user_account) 
        return null;
    
    let user_followers: number = 42;//await FollowEntity.count({ where: { target_id: user_id } });
    let user_following: number = 42;//await FollowEntity.count({ where: { subscriber_id: user_id } });
    let result: UserModel = {
        id: user_account.id,
        name: user_account.username,
        email: user_account.email,
        followers: user_followers,
        following: user_following,
        avatarURL: user_account.avatar_url,
        backgroundURL: user_account.background_url,
        nickName: user_account.nickName,
        description: user_account.description
    }
    return result;
}

export async function getUserPosts(user_id: Number): Promise<MinPostModel[]|null> {
    let user_account: UserEntity|null = await UserEntity.findOne({ where: { id: user_id } });
    if (!user_account) 
        return null;
    let result = (await user_account.$get("posts")).map(post => new MinPostModel(post));
    return result;
}

export async function getUserPost(user_id: Number, post_id: Number): Promise<MinPostModel|null> {
    let user_account: UserEntity|null = await UserEntity.findOne({ where: { id: user_id } });
    if (!user_account)
        return null;
    let post: PostEntity|null = await PostEntity.findOne({ where: { id: post_id } });
    if (!post)
        return null;
    return new MinPostModel(post);
}