/* global enigma schema Filter include Hypercube */ 
class Filter {
  constructor (elementId, options) {
    const DEFAULT = {}
    this.elementId = elementId
    this.options = Object.assign({}, options)

    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      el.innerHTML = `<ul id='${this.elementId}_list'></ul>`
      this.options.model.on('changed', this.render.bind(this))
      this.render()
    }
    else {
      console.error(`no element found with id - ${this.elementId}`)
    }
  }

  handleClick (event) {
    if (event.target.classList.contains('list-item')) {
      const elemNumber = event.target.getAttribute('data-elem')
      this.options.model.selectListObjectValues('/qListObjectDef', [+elemNumber], true)
    }
  }

  render () {
    this.options.model.getLayout().then(layout => {
      let html = layout.qListObject.qDataPages[0].qMatrix.map(row => 
        `<li data-elem="${row[0].qElemNumber}" class='list-item state-${row[0].qState}'>${row[0].qText}</li>`).join('')
      const el = document.getElementById(`${this.elementId}_list`)
      if (el) {
        el.innerHTML = html
      }
    })
  }
}

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
      this.options.model.selectHyperCubeValues('/qHyperCubeDef ', 0, [1], true)
      console.log(event)
    }
  }

  render () {
    this.options.model.getLayout().then(layout => {
      let html = ''
      layout.qHyperCube.qDataPages[0].qMatrix.forEach(row => {
        html += '<tr>'
        html += row.map(cell => `<td class="table-row">${cell.qText}</td>`).join('')
        html += '</tr>'
      })
      const el = document.getElementById(`${this.elementId}_table`)
      if (el) {
        el.innerHTML = html
      }
    })
  }
}


const session = enigma.create({
  schema,
  url: 'wss://ec2-3-92-185-52.compute-1.amazonaws.com/anon/app/dcde8122-0c49-4cea-a935-d30145015cd6'
})

session.open().then(global => {
  global.openDoc('dcde8122-0c49-4cea-a935-d30145015cd6').then(app => {
    app.getField('Region').then(field => {

    })
    const def = {
      qinfo: {
        qType: 'this can be whatever I put'
      },
      qListObjectDef: {
        qDef: {
          qFieldDefs: ['Region']
        },
        qInitialDataFetch: [{
          qTop: 0,
          qLeft: 0,
          qWidth: 1,
          qHeight: 2
        }]
      }
    }
    
    app.createSessionObject(def).then(model => {
      console.log(model)
      const f = new Filter('filter1', { model })
    })

    const def2 = {
      qInfo: {
        qType: 'myObject'
      },
      qHyperCubeDef: {
        qDimensions: [
          { qDef: { qFieldDefs: ['Product'] } }
        ],
        qMeasures: [
          { qDef: { qDef: 'Sum(TotalPrice)', qLabel: 'Sales' } }
        ],
        qInitialDataFetch: [
          { qTop: 0,
            qLeft: 0,
            qWidth: 2, 
            qHeight: 10
          }]
      }
    }
    app.createSessionObject(def2).then(model => {
      const hyperCubeTest = new Hypercube('filter2', { model })
      console.log(hyperCubeTest)
      // model.getHyperCubeData('/qHyperCubeDef')
    })
  })
})
