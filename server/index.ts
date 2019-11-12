/* eslint-disable no-console */

import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';

import { createApp } from './app';

const PORT = process.env.PORT ?? '8080';

(async () => {
    const app = await createApp();
    let server: https.Server | http.Server;

    const shutdown = () =>
        server.close((err: any) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            process.exit(0);
        });

    // run an https server in dev mode
    if (process.env.NODE_ENV !== 'production') {
        const cert = await fs.promises.readFile(path.join(__dirname, 'cert.pem'));
        const key = await fs.promises.readFile(path.join(__dirname, 'key.pem'));
        server = https.createServer({ cert, key }, app);
    } else {
        server = http.createServer(app);
    }

    server.listen(PORT, () => {
        console.log(`> Listening on port ${PORT}`);
    });

    // quit on ctrl-c when running docker in terminal
    process.on('SIGINT', () => {
        console.info('> Got SIGINT. Graceful shutdown');
        shutdown();
    });

    // quit properly on docker stop
    process.on('SIGTERM', () => {
        console.info('> Got SIGTERM. Graceful shutdown');
        shutdown();
    });
})();
