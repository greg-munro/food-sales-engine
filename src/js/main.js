/* global enigma schema */ 
const session = enigma.create({
  schema,
  url: 'wss://ec2-3-92-185-52.compute-1.amazonaws.com/anon/app/dcde8122-0c49-4cea-a935-d30145015cd6'
})

session.open().then(global => {
  console.log(global)
  global.openDoc('dcde8122-0c49-4cea-a935-d30145015cd6').then(app => {
    app.getField('Region').then(field => {
      field.selectValues([{ qtext: 'East' }]).then(res => {
        console.log(res)
      })
    })
  })
})
