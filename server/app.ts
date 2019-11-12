import express from 'express';
import morgan from 'morgan';
import next from 'next';

const HEALTHCHECK = process.env.HEALTHCHECK ?? '/hc';
const LOG_FORMAT = process.env.LOG_FORMAT ?? 'combined';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (): express.ErrorRequestHandler => (err, req, res, next) => {
    const statusCode = res.statusCode && res.statusCode >= 400 ? res.statusCode : 500;
    if (statusCode >= 500) {
        // eslint-disable-next-line no-console
        console.error(err);
    }
    res.sendStatus(statusCode);
};

export const healthCheck = (): express.RequestHandler => (req, res) => {
    res.status(200).send('.');
};

export const indexHandler = (): express.RequestHandler => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { name, version } = require('../package.json');
    return (req, res) => {
        res.status(200).json({
            timestamp: new Date().toISOString(),
            name,
            version,
        });
    };
};

export const notFoundHandler = (): express.RequestHandler => (req, res, next) => {
    res.status(404);
    next(new Error('Not found'));
};

export const createApp = async () => {
    const app = express();
    const server = next({ dev: process.env.NODE_ENV !== 'production' });
    const requestHandler = server.getRequestHandler();

    app.use(express.urlencoded({ extended: true }));
    app.use(morgan(LOG_FORMAT, { skip: req => req.path === HEALTHCHECK }));

    // index route
    app.get('/', indexHandler());

    // health check route
    app.get(HEALTHCHECK, healthCheck());

    // handle next.js app routes
    // app.get('/shows/:slug', (req, res) => server.render(req, res, '/show', req.params));
    app.get('*', (req, res) => requestHandler(req, res));

    // handle 404 requests
    app.use(notFoundHandler());

    // handle error responss
    app.use(errorHandler());

    // wait for next.js to be ready
    await server.prepare();

    return app;
};
