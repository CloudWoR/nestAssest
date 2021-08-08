import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class WorkDetailMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    // console.log('连接请求', req.url);
    next();
  }
}
