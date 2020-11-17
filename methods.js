const fs = require('fs')
const path = require('path')

let response = {}

fs.readFile(path.join(__dirname, 'data.json'), (err, data) => {
  if (err) throw err
  response = JSON.parse(data)

  console.log('Первый метод :',productName(response))
  console.log('Второй метод :',stocksSearch(response, secondMethod))
  console.log('Третий метод :',stocksSearch(response, thirdMethod, ['0', '0']))
})

// Первый метод
const productName = (obj) => obj['displayedName']['displayedName']['value'][0]

// Второй метод
const secondMethod = (item, arr) => (item[1] != '0' ? arr.push(item[0]) : null)

// Третий метод
const thirdMethod = (item, arr) => {
  if (+item[1] >= +arr[1]) {
    arr[0] = item[0]
    arr[1] = item[1]
  }
}

// Общая функция для 2 и 3 метода
const stocksSearch = (obj, func, paramsArr) => {
  let arr = paramsArr || []
  Object.entries(
    Object.values(obj['stock']['stocks'])[0])
     .forEach((item) =>func(item, arr)
  )
  return arr
}




