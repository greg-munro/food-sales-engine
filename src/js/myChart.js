/* global Chart */
class Test {
  constructor (elementId, options) {
    const DEFAULT = {}
    this.elementId = elementId
    this.options = Object.assign({}, options)
    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      this.options.model.on('changed', this.render.bind(this))
      const config = {
        type: 'bar', 
        options: {}
      }
      this.myChart = new Chart(
        document.getElementById(this.elementId), 
        config
      )
      this.render()
    }
    else {
      console.error(`no element found with id - ${this.elementId}`)
    }
  }
  
  handleClick (event) {
    if (event.target.classList.contains('table-row')) {
      const elemNumber = event.target.getAttribute('data-elem')
      this.options.model.selectHyperCubeValues('/qHyperCubeDef', 0, [+elemNumber], true)
        .then(res => {}, error => { console.log(error, 'error') })
    }
  }

  render () {
    this.options.model.getLayout().then(layout => {
      const data = {
        labels: [],
        datasets: [{
          label: 'Food Sales USA 2020-2021',
          backgroundColor: '#29AAF2',
          borderColor: 'rgb(255, 99, 132)',
          data: []
        }]
      }
      
      layout.qHyperCube.qDataPages[0].qMatrix.forEach(row => {
        data.labels.push(row[0].qText)
        data.datasets[0].data.push(row[1].qNum)
      })
      this.myChart.data = data 
      this.myChart.update()
    })
  }
}
