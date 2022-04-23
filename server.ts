import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import * as https from "https";
import * as fs from "fs";
import * as http from "http";

const MockBrowser = require('mock-browser').mocks.MockBrowser;
const mock = new MockBrowser();

global['document'] = mock.getDocument();
global['window'] = mock.getWindow();

export function app(): express.Express {
  const server = express();
    server.all('*', function(req, res, next){
        console.log('req start: ',req.secure, req.hostname, req.originalUrl, server.get('port'));
        if (req.secure) {
            return next();
        }

        res.redirect('https://'+req.hostname + req.originalUrl);
    });
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
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = 443;
  const server = app();

    https
        .createServer(
            {
                key: fs.readFileSync("/etc/letsencrypt/live/hrchatbot.space/privkey.pem"),
                cert: fs.readFileSync("/etc/letsencrypt/live/hrchatbot.space/fullchain.pem"),
            },
            server
        )
        .listen(port, function () {
            console.log(
                `app listening on port ${port}! Go to https://localhost:${port}/`
            );
        });
	http.createServer(server).listen(80);
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
