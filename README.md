# spinarak
nodejs function for webscraping

## Bursa Malaysia API
```javascript
getHistorical({ 
  stockcode: 5250, 
  fromDate: DateTime.fromISO('2022-02-01'), 
  toDate: DateTime.fromISO('2022-02-04') 
}).then((data) => {
  console.log(data);
})
```
