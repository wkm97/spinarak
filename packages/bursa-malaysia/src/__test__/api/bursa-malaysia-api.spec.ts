import { DateTime } from 'luxon'
import { getHistorical } from '../..'
import { createBaseUrl, parseHistoricalData } from '../../bursa-malaysia'
import { mockResponseBody } from '../mocks/response-body.mock'

describe('test bursa-malaysia api', ()=>{
  test('create a base url', async()=>{
    const { baseUrl, searchParams } = await createBaseUrl(1818)
    expect(baseUrl).toBe('https://ws20.bursamalaysia.com/api/v2/stock_price_data')
    expect(searchParams.mode).toBe('historical')
    expect(searchParams.stock_code).toBe('1818.MY')
    expect(searchParams.ws_a).toBeDefined();
    expect(searchParams.ws_a).not.toBeNull();
    expect(searchParams.ws_m).toBeDefined();
    expect(searchParams.ws_m).not.toBeNull();
  })

  test('historical data parser', ()=>{
    const historicalData = parseHistoricalData(mockResponseBody)
    expect(historicalData).toMatchObject({
      success: expect.any(Number),
      record_count: expect.any(Number),
      data: expect.any(Array)
    })

    expect(historicalData.data[0]).toMatchObject({
      date: expect.any(DateTime),
      id: expect.any(String),
      name: expect.any(String),
      open: expect.any(Number),
      high: expect.any(Number),
      low: expect.any(Number),
      close: expect.any(Number),
      volume: expect.any(Number),
    })
  })

  test('e2e get historical data', async()=>{
    const testData = await getHistorical({
      stockcode: 1818, 
      fromDate: DateTime.fromISO('2022-02-07'), 
      toDate: DateTime.fromISO('2022-02-11')
    })
    expect(testData.data).toHaveLength(testData.record_count)
    const firstData = testData.data[0]
    const lastData = testData.data[testData.data.length - 1]
    expect(DateTime.fromISO('2022-02-07').diff(firstData.date).days).toBe(0)
    expect(DateTime.fromISO('2022-02-11').diff(lastData.date).days).toBe(0)
  })

  test('e2e get historical data fromDate later than toDate', async() => {
    await expect(getHistorical({
      stockcode: 1818, 
      fromDate: DateTime.fromISO('2022-02-13'), 
      toDate: DateTime.fromISO('2022-02-11')
    })).rejects.toThrow()
  })
})

