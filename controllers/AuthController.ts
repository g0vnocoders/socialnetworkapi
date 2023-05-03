import { Get, Route } from "tsoa";
import { LoginModel } from '../models/LoginModel';
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
}