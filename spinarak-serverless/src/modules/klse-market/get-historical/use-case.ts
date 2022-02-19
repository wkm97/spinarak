import { GetHistoricalDTO } from "./request-dto";
import {getHistorical} from '@spinarak/bursa-malaysia';
//use case
export class GetHistorical {
  async execute(request: GetHistoricalDTO) {
    try{
      const results = await getHistorical({...request})
      return results
    }catch(e){
      console.log('GETTING HISTORICAL:', e)
    }
  }
}