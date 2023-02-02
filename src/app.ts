import express from 'express';
import { json, urlencoded } from 'body-parser';
import connect from './db/db.connection';
import createError from 'http-errors';
import routes from './routes/index';
import cors from 'cors';

export const app = express();

app.use(json())
app.use(urlencoded({ extended: true }));
app.use(cors());

//Cors
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PATCH, PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//Routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});


// error handler
app.use(function(err: any, req: express.Request, res: express.Response) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err.status);
});

connect();

export default app;
