import { UserModel } from './../models/UserModel';
import { UserEntity } from '../entities/UserEntity';
import { FollowEntity } from '../entities/FolllowEntity';
import { FollowInfo } from '../models/FollowInfo';
import { PostEntity } from '../entities/PostEntity';

export async function getUserInfo(user_id:Number) {
    let user_account: UserEntity|null = await UserEntity.findOne({ where: { id: user_id } });
    if (!user_account) 
        return null;
    
    let user_followers: number = await FollowEntity.count({ where: { target_id: user_id } });
    let user_following: number = await FollowEntity.count({ where: { subscriber_id: user_id } });
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

export async function getUserPosts(user_id: Number) {
    let user_account: UserEntity|null = await UserEntity.findOne({ where: { id: user_id } });
    if (!user_account) 
        return null;
    let result = await user_account.$get("posts");
    return result;
}
/*s
export async function getUserFollows(user_id: Number){
    let followers: UserEntity[] = await FollowEntity.findAll({ where: { 
    let result: FollowInfo = {
        followers: 0
}]*/