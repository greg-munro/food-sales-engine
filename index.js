const express = require('express')
const app = express()

app.use('/external', express.static(`${__dirname}/node_modules`))
app.use('/resources', express.static(`${__dirname}/public`))

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`)
})

app.listen(process.env.PORT || 4000)
