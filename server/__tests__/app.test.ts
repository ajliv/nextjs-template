import express from 'express';
import request from 'supertest';

import { errorHandler, healthCheck, notFoundHandler } from '../app';

describe('healthCheck()', () => {
    const app = express().get('/hc', healthCheck());

    it('should return a status code of 200', async () => {
        const resp = await request(app)
            .get('/hc')
            .send();
        expect(resp.status).toBe(200);
        expect(resp.text).toBe('.');
    });
});

describe('errorHandler()', () => {
    const app = express()
        .get('/', (req, res, next) => {
            res.status(404);
            next(new Error('Not found'));
        })
        .post('/save', (req, res, next) => {
            res.status(401);
            next(new Error('Unauthorized'));
        })
        .use(errorHandler());

    it('should return a status code', async () => {
        const notFound = await request(app)
            .get('/')
            .send();
        expect(notFound.status).toBe(404);

        const unauthorized = await request(app)
            .post('/save')
            .send({});
        expect(unauthorized.status).toBe(401);
    });
});

describe('notFoundHandler()', () => {
    const app = express()
        .get('/', (req, res) => res.sendStatus(200))
        .use(notFoundHandler())
        .use(errorHandler());

    it('should return 404 for missing routes', async () => {
        const known = await request(app)
            .get('/')
            .send();
        expect(known.status).toBe(200);

        const missing = await request(app)
            .get('/asdf')
            .send();
        expect(missing.status).toBe(404);
    });
});
