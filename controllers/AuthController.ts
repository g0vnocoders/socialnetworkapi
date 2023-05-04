import { LoginModel } from './../models/LoginModel';
import { Body, Get, Post, Route } from "tsoa";
import { AuthResponse } from "../models/AuthResponse";
import { JsonObject } from 'swagger-ui-express';
import { UserEntity } from '../entities/UserEntity';

@Route("/")
export class AuthController {
    @Get("test/{login}")
    public async authorize(login: string): Promise<AuthResponse> {
        const user = await UserEntity.findOne({
            where: {
                username: login
            }
        });
        if(user){
            return {
                token: user.password,
                state: true,
                message: "zaebis, " + login
            };
        }
        return {
            token: "get login kek",
            state: false,
            message: "ne zaebis, " + login
        }

    }
    @Post("login")
    public async login(@Body() model: LoginModel): Promise<AuthResponse> {
        return {
            token: "post login kek",
            state: true,
            message: "zaebis, " + model.username
        };
    }
    @Post("register")
    public async register(@Body() model: LoginModel){
        const user: UserEntity = await UserEntity.create({
            username: model.username,
            password: model.password,
            email: model.username,
            is_admin: false
        });
        //201
        return {
            "state": true
        }
    }
}