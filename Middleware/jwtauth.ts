import { assert } from "console";
import * as express from "express";
import * as jwt from "jsonwebtoken";

export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    assert( securityName === "jwt")
    const token =   
        request.body.token ||
        request.query.token ||
        request.headers["x-access-token"];

    return new Promise((resolve, reject) => {
        if (!token) 
            reject(new Error("No token provided"));

        //verify token
        jwt.verify(token, "[secret]", function (err: any, decoded: any) {
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
