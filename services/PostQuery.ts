import { MinPostModel } from './../models/MinPostModel';
import { UserModel } from './../models/UserModel';
import { UserEntity } from '../entities/UserEntity';
import { FollowEntity } from '../entities/FolllowEntity';
import { FollowInfo } from '../models/FollowInfo';
import { PostEntity } from '../entities/PostEntity';
import { MinUserModel } from '../models/MinUserModel';

export async function createPost(body : MinPostModel, user: UserEntity) {
    const post = await PostEntity.create({
        user_id: user.id,
        name: body.name,
        text: body.text,
        image_url: body.image_url  
    });
    return new MinPostModel(post);
}

/*
GET /users
GET /users/id
GET /users/id/posts
GET /posts
GET /post/id
GET /post/id/comments

POST /post
POST /register
POST /post/id/like
POST /post/id/comment
*/