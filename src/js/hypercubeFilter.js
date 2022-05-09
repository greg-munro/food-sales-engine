class Hypercube {
  constructor (elementId, options) {
    const DEFAULT = {}
    this.elementId = elementId
    this.options = Object.assign({}, options)
    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      el.innerHTML = `<table id='${this.elementId}_table'></table>` 
      this.options.model.on('changed', this.render.bind(this))
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
      let html = ''
      layout.qHyperCube.qDataPages[0].qMatrix.forEach(row => {
        html += '<tr>'
        html += row.map(cell => `<td data-elem="${cell.qElemNumber}"class="table-row">${cell.qText}</td>`).join('')
        html += '</tr>'
      })
      const el = document.getElementById(`${this.elementId}_table`)
      if (el) {
        el.innerHTML = html
      }
    })
  }
}
