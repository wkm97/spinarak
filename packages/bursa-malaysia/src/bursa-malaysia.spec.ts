import { createBaseUrl } from './bursa-malaysia'

describe('test bursa-malaysia', ()=>{
  test('1+1', async()=>{
    console.log(await createBaseUrl(5250))
    expect(1+1).toBe(2)
  })
})