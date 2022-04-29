import 'zone.js/dist/zone-node';

import {ngExpressEngine} from '@nguniversal/express-engine';
import * as express from 'express';
import {join} from 'path';

import {AppServerModule} from './src/main.server';
import {APP_BASE_HREF} from '@angular/common';
import * as fs from 'fs';
import {existsSync} from 'fs';
import * as https from "https";
import * as http from "http";

const MockBrowser = require('mock-browser').mocks.MockBrowser;
const mock = new MockBrowser();

global['document'] = mock.getDocument();
global['window'] = mock.getWindow();

const prod = false;
const sslPort = 443;
const port = process.env['PORT'] || (prod ? 80 : 4000);

export function app(): express.Express {
    const server = express();
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

    if (prod) {
        // @ts-ignore
        server.all('*', (req, res, next) => {
            req.secure ? next() : res.redirect(`https://${req.headers.host}${req.url}`)
        });
    }

    const distFolder = join(process.cwd(), 'dist/ziot-store/browser');
    const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

    server.engine('html', ngExpressEngine({
        bootstrap: AppServerModule,
    }));

    server.set('view engine', 'html');
    server.set('views', distFolder);

    server.get('*.*', express.static(distFolder, {
        maxAge: '1y'
    }));

    server.get('*', (req, res) => {
        console.log("Get");
        res.render(indexHtml, {req, providers: [{provide: APP_BASE_HREF, useValue: req.baseUrl}]});
    });

    return server;
}

function run(): void {
    const server = app();

    if (prod) {
        https
            .createServer(
                {
                    key: fs.readFileSync("/etc/letsencrypt/live/hrchatbot.space/privkey.pem"),
                    cert: fs.readFileSync("/etc/letsencrypt/live/hrchatbot.space/fullchain.pem")
                },
                server
            )
            .listen(sslPort,  () => {
                console.log(
                    `App listening on port ${sslPort}! Go to https://localhost:${sslPort}/`
                );
            });
    }

    http
        .createServer(server)
        .listen(port, () => {
            console.log(
                `App listening on port ${port}! Go to https://localhost:${port}/`
            );
        });
}

run()

export * from './src/main.server';
