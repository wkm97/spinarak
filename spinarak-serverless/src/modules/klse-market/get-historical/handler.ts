import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from '@modules/klse-market/get-historical/request-schema';
import { DateTime } from 'luxon';
import { GetHistorical } from './use-case';

const getHistorical: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { stockcode, fromDate, toDate } = event.body;
  
  const result = await new GetHistorical().execute({
    stockcode,
    fromDate: fromDate? DateTime.fromISO(fromDate) : null,
    toDate: toDate ? DateTime.fromISO(toDate): null,
  })
  return formatJSONResponse({
    result: result
  });
};

export const main = middyfy(getHistorical);