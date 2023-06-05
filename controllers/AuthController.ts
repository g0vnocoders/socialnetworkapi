import { LoginModel } from './../models/LoginModel';
import { Body, Controller, Get, Post, Route, Request, Response, Security, SuccessResponse } from "tsoa";
import { StateError, StateResponse } from "../models/StateResponse";
import { JsonObject } from 'swagger-ui-express';
import { UserEntity } from '../entities/UserEntity';
import { expressAuthentication, generateJWT } from "../Middleware/jwtauth";

@Route("/")
export class AuthController extends Controller{

    @Post("login")
    public async login(@Body() model: LoginModel): Promise<StateResponse> {
        const user = await UserEntity.findOne({ where: { email: model.email } });
        //set code to 401 if failed
        this.setStatus(401);
        if(!user) 
            return StateError("User not found");

        //check password
        if(!await user.validatePassword(model.password)) 
            return StateError("Invalid password");

        //200
        this.setStatus(200);
        const jwt = await generateJWT(user);
        this.setHeader("Set-Cookie", `token=${jwt}; HttpOnly`);
        return {state: true};
    }

    @Post("register")
    public async register(@Body() model: LoginModel){
        const user: UserEntity = await UserEntity.create({
            username: model.username,
            password: model.password,
            email: model.email,
            nickName: model.username,
            is_admin: false
        });
        //201
        return {
            "state": true
        }
    }

    @Security("headerjwt", ["user"])
    @Get("testprotected")
    public async testprotected(@Request() request: any): Promise<StateResponse> {
        return {state: true};
    }
}