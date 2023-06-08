
import { expressAuthentication } from "../Middleware/jwtauth";
import { MinUserModel } from '../models/MinUserModel';
import { UserModel } from '../models/UserModel';
import { getUserInfo, getUserPost, getUserPosts, getUsers } from '../services/UserQuery';
import { PostEntity } from '../entities/PostEntity';
import { MinPostModel } from '../models/MinPostModel';
import { Body, Controller, Get, Post, Request, Route, Security } from "tsoa";
import { createPost } from "../services/PostQuery";
import { PostModel } from "../models/PostModel";
import { StateError, StateResponse } from "../models/StateResponse";
import { UserEntity } from "../entities/UserEntity";


@Route("/posts")
export class PostsController extends Controller{
    @Security("headerjwt", ["user"])
    @Post()
    public async createPost(@Body() model: PostModel, @Request() request: any): Promise<StateResponse|null> {
        let userauthor : UserEntity|null = await UserEntity.findOne({where: {id: request.user.id}});
        if(!userauthor)
            return StateError("User not found/invalid session");
        await createPost(model, userauthor);
        return {state: true};
    }
}