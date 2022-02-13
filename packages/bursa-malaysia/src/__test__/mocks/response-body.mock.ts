import { ResponseBody } from "../../bursa-malaysia";

export const mockResponseBody: ResponseBody = {
  historical_data: {
    success: 1,
    record_count: 2,
    data: [
      {
        "date": 1486684800000,
        "id": "1818",
        "name": "BURSA",
        "open": "8.710",
        "high": "8.760",
        "low": "8.710",
        "close": "8.750",
        "vol": 1120700
      },
      {
        "date": 1486944000000,
        "id": "1818",
        "name": "BURSA",
        "open": "8.720",
        "high": "8.780",
        "low": "8.720",
        "close": "8.740",
        "vol": 1910900
      }
    ]
  }
}