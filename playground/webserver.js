const express = require('express')

const app = express()


app.get('/ciudad/:ciudad?', function(req,res) {
 res.send(req.params.ciudad);
})

app.get('/', function (req,res) {
 res.send('<h1>Test CSD</h1>')
})
app.listen(80,'0.0.0.0')

