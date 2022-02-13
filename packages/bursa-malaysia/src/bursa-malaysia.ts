import got from 'got';
import cheerio from 'cheerio';
import { DateTime } from 'luxon';

export interface HistoricalParams {
  stockcode: number;
  fromDate?: DateTime;
  toDate?: DateTime; // data is included
}

export interface CandleData {
  date: DateTime;
  id: string;
  name: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface HistoricalData {
  success: number;
  record_count: number;
  data: CandleData[];
}

export interface ResponseBody {
  historical_data: {
    success: number;
    record_count: number;
    data: {
      date: number;
      id: string;
      name: string;
      open: string;
      high: string;
      low: string;
      close: string;
      vol: number;
    }[];
  }
}

export const createBaseUrl = async (stockcode: number) => {
  const url = `https://www.bursamalaysia.com/trade/trading_resources/listing_directory/company-profile?stock_code=${stockcode}`;
  const response = await got.get(url);
  const $ = cheerio.load(response.body);
  const apiStockcode = $('div[id="stockChartContainer"]').attr('data-stock-code');
  const apiSource = $('div[id="stockChartContainer"]').attr('data-api-source');
  const websocketA = $('div[id="stockChartContainer"]').attr('data-ws-a');
  const websocketM = $('div[id="stockChartContainer"]').attr('data-ws-m');
  const searchParams = {
    mode: 'historical',
    stock_code: apiStockcode,
    ws_a: websocketA,
    ws_m: websocketM,
  };
  // return `https:${apiSource}?stock_code=${apiStockcode}&mode=historical&ws_a=${websocketA}&ws_m=${websocketM}`;
  return {
    baseUrl: `https:${apiSource}`,
    searchParams,
  };
};

export const parseHistoricalData = (response: ResponseBody) => {
  const allCandleData: CandleData[] = response.historical_data.data.map((item) => ({
    date: DateTime.fromMillis(item.date),
    id: item.id,
    name: item.name,
    open: parseFloat(item.open),
    high: parseFloat(item.high),
    low: parseFloat(item.low),
    close: parseFloat(item.close),
    volume: /* istanbul ignore next */ typeof item.vol === 'string' ? 0 : item.vol,
  }));
  return {
    ...response.historical_data,
    data: allCandleData,
  } as HistoricalData;
};

export const getHistorical = async(params: HistoricalParams) => {
    params = {
      fromDate: DateTime.fromISO('2020-01-01'),
      toDate: DateTime.now(),
      ...params,
    };

    const { fromDate, toDate } = params;

    if (fromDate && toDate && fromDate.diff(toDate).milliseconds > 0) {
      throw new Error('fromDate cannot more than toDate.');
    }

    const { baseUrl, searchParams } = await createBaseUrl(params.stockcode);
    const options = {
      searchParams: {
        ...searchParams,
        from_date: /* istanbul ignore next */ fromDate?.toFormat('yyyyMMdd'),
        to_date: /* istanbul ignore next */ toDate?.toFormat('yyyyMMdd'),
      },
    };
    const responseBody = await got.get(baseUrl, options).json() as unknown as ResponseBody;
    return parseHistoricalData(responseBody);
}
