import { DateTime } from 'luxon';
import { getHistorical } from '@spinarak/bursa-malaysia';

export const add = (num1: number, num2: number) => num1 + num2;

getHistorical({ stockcode: 5250, fromDate: DateTime.fromISO('2022-02-01'), toDate: DateTime.fromISO('2022-02-04') }).then((data) => {
  console.log(data);
})
