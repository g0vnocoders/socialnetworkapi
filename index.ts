import { NextFunction } from "express";

import createError from 'http-errors';
import express, { Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
//routes
import {default as indexRouter} from './routes/index';
import { RegisterRoutes } from "./routes/routes";
//swagger
import swaggerUi from 'swagger-ui-express';
//test
import { createTestRecords } from "./tests/data";

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(undefined, { swaggerOptions: { url: '/swagger.json' } }));

app.use('/', indexRouter);

RegisterRoutes(app);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
    next(createError(404));
});

// error handler
app.use(function(err: any, req: any, res: any, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status ?? 500);
    res.send(
        {
            message: err.message,
            debug: res.locals.error
        });
});

export default app;