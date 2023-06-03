
import { expressAuthentication } from "../Middleware/jwtauth";
import { MinUserModel } from '../models/MinUserModel';
import { UserModel } from '../models/UserModel';
import { getUserInfo, getUserPost, getUserPosts, getUsers } from '../services/UserQuery';
import { PostEntity } from '../entities/PostEntity';
import { MinPostModel } from '../models/MinPostModel';
import { Controller, Get, Post, Route, Security } from "tsoa";

@Security("headerjwt", ["user"])
@Route("/post")
export class PostController extends Controller{
    @Post()
    public async createPost(): Promise<MinPostModel|null> {
        return null;
    }
}