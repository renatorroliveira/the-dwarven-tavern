import _ from 'lodash';
import { v4 } from 'uuid';

import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const requestId = v4();
        const logger = new Logger(`${requestId}.RequestLogger`);
        res.setHeader('X-RequestId', requestId);
        req.setTimeout(25000);
        _.set(req, 'requestId', requestId);

        logger.log(
            `Request received: ${JSON.stringify({
                path: req.path,
                method: req.method,
            })}`,
        );

        // Ends middleware function execution, hence allowing to move on
        if (next) {
            logger.debug(`Calling next() function...`);
            next();
        } else {
            logger.warn(`No next() function received.`);
        }
    }
}
