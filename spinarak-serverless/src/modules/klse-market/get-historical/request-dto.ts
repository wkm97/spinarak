import {IsDate} from 'class-validator';
import { DateTime } from 'luxon';

export class GetHistoricalDTO {
  
  stockcode: number;

  @IsDate()
  fromDate?: DateTime;

  @IsDate()
  toDate?: DateTime;

}