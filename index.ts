import { NextFunction } from "express";

import createError from 'http-errors';
import express, { Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
//routes
import {default as indexRouter} from './routes/index';
import {default as usersRouter} from './routes/users';
import { RegisterRoutes } from "./routes/routes";
//swagger
import swaggerUi from 'swagger-ui-express';


var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(undefined, { swaggerOptions: { url: '/swagger.json' } }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

RegisterRoutes(app);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
    next(createError(404));
});

// error handler
app.use(function(err: Error, req: any, res: any, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(500);
    res.render('error');
});

module.exports = app;