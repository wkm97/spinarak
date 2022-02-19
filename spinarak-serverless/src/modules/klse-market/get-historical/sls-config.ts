import schema from '@modules/klse-market/get-historical/request-schema';
import { createHttpPath, handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: createHttpPath(__dirname),
        // path: 'klse-market/get-historical',
        request: {
          schema: {
            'application/json': schema,
          },
        },
      },
    },
  ],
  timeout: 60
};