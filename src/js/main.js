/* global enigma schema Filter include */ 
include('./filter.js')

const session = enigma.create({
  schema,
  url: 'wss://ec2-3-92-185-52.compute-1.amazonaws.com/anon/app/dcde8122-0c49-4cea-a935-d30145015cd6'
})

session.open().then(global => {
  global.openDoc('dcde8122-0c49-4cea-a935-d30145015cd6').then(app => {
    app.getField('Region').then(field => {
      console.log(field)
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
          { qTop: 0, qLeft: 0, qWidth: 2, qHeight: 8000 }
        ]
      }
    }
    app.createSessionObject(def2).then(model => {
      console.log('model', model)
    })
  })
})
