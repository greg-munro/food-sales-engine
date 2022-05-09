/* global Chart */

const labels = [
  'Carrot',
  'Whole Wheat',
  'Chocolate Chip',
  'Arrowroot',
  'Potato Chips',
  'Oatmeal Raisin',
  'Bran',
  'Pretzels',
  'Banana'
]

const data = {
  labels: labels,
  datasets: [{
    label: 'Food Sales USA 2020-2021',
    backgroundColor: '#29AAF2',
    borderColor: 'rgb(255, 99, 132)',
    data: [7410.99, 3393.93, 4752.15]
  }]
}

const config = {
  type: 'bar',
  data: data,
  options: {}
}

const myChart = new Chart(
  document.getElementById('myChart'),
  config
)
