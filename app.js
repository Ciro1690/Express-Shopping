const express = require("express")
const app = express()
const shoppingRoutes = require('./routes/items')
const ExpressError = require('./expressError')

app.use(express.json())
app.use('/items', shoppingRoutes)

app.use(function(req, res, next) {
    return new ExpressError('Not found', 404)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)

    return res.json({
        error: err.message,
    })
})

module.exports = app