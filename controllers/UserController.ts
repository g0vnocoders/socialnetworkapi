import { LoginModel } from './../models/LoginModel';
import { Body, Controller, Get, Post, Route, Request, Security, SuccessResponse } from "tsoa";
import { StateError, StateResponse } from "../models/StateResponse";
import { JsonObject } from 'swagger-ui-express';
import { UserEntity } from '../entities/UserEntity';
import { expressAuthentication } from "../Middleware/jwtauth";
import { MinUserModel } from '../models/MinUserModel';
import { UserModel } from '../models/UserModel';
import { getUserInfo, getUserPost, getUserPosts, getUsers } from '../services/UserQuery';
import { PostEntity } from '../entities/PostEntity';
import { MinPostModel } from '../models/MinPostModel';

@Route("/users")
export class UserController extends Controller{
    @Get()
    public async users(): Promise<MinUserModel[]> {
       return await getUsers();
    }

    @Get("{id}")
    public async user(id: number): Promise<UserModel|null> {
        return await getUserInfo(id);
    }

    @Get("{id}/posts")
    public async userPosts(id: number): Promise<MinPostModel[]|null> {
        return await getUserPosts(id);
    }
    
    @Get("{id}/posts/{post_id}")
    public async userPost(id: number, post_id: number): Promise<MinPostModel|null> {
        return await getUserPost(id, post_id);
    }
}