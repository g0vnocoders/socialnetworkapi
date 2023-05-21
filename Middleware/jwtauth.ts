import { assert } from "console";
import * as express from "express";
import * as jwt from "jsonwebtoken";
import { UserEntity } from "../entities/UserEntity";

export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {

    const token =   
        request.body.token ||
        request.query.token ||
        request.headers["x-access-token"] ||
        request.cookies.token;

    return new Promise((resolve, reject) => {
        if (!token) 
            reject(new Error("No token provided."));

        if(process.env.JWT_SECRET === undefined){
            reject(new Error("JWT_SECRET not set"));
            return;
        }
        //verify token
        jwt.verify(token, process.env.JWT_SECRET, function (err: any, decoded: any) {
            if (err) {
                reject(err);
            } else {
                if(scopes === undefined){
                    resolve(decoded);
                    return;
                }

                // Check if JWT contains all required scopes
                for (let scope of scopes) {
                    if (!decoded.scopes.includes(scope)) {
                        reject(new Error("JWT does not contain required scope."));
                    }
                }
                resolve(decoded);
            }
        });
    });
}

export function generateJWT(user: UserEntity): Promise<string>{
    return new Promise((resolve, reject) => {
        if(process.env.JWT_SECRET === undefined){
            reject(new Error("JWT_SECRET not set"));
            return;
        }
        const data = {
            username: user.username,
            id: user.id,
            scopes: ["user"]
        }
        if(user.is_admin)
            data.scopes.push("admin");
        jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1d' }, function (err: any, token: any) {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}