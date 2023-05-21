#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '..';
import debug from 'debug';
import * as http from 'http';
import { connection } from "../dbConnector";
import fs from 'fs';
import { randomBytes } from 'crypto';
import { createTestRecords } from '../tests/data';
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


//init jwt secret
let secret = null;
if(!fs.existsSync("./jwtsecret.key"))
    secret = randomBytes(32).toString('base64');
    if(secret != null)
        fs.writeFileSync("./jwtsecret.key", secret);
else
    secret = fs.readFileSync("./jwtsecret.key").toString();

process.env.JWT_SECRET = secret;


//init db on start
connection.sync().then(async() => {
    console.log("db connected");
    if(process.env.VSCODE_INJECTION === "1")
        createTestRecords();
    //check if accounts > 0
    let users = await connection.models.UserEntity.findAll();
    if(users.length > 0) return;
    //create admin account
    await connection.models.UserEntity.create({
        username: "admin",
        password: "admin",
        email: "admin",
        nickName: "administator",
        avatar_url: "https://a.ppy.sh/1.png",
        background_url: "https://a.ppy.sh/1.png",
        description: "admin account",
        is_admin: true
    });
    console.log("admin account created");
}).catch((err: any) => {
    console.log(err);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val:string): Number | string | boolean {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error:any): void {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr?.port;
    console.log('Listening on ' + bind);
}