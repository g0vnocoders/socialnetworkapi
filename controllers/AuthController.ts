import { LoginModel } from './../models/LoginModel';
import { Body, Get, Post, Route } from "tsoa";
import { AuthResponse } from "../models/AuthResponse";

@Route("/")
export class AuthController {
    @Get("test/{login}")
    public async authorize(login: string): Promise<AuthResponse> {
        return {
            token: "herna",
            state: true,
            message: "zaebis, " + login
        };
    }
    @Post("login")
    public async login(@Body() model: LoginModel): Promise<AuthResponse> {
        return {
            token: "post login kek",
            state: true,
            message: "zaebis, " + model.username
        };
    }
}