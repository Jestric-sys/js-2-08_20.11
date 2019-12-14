const express = require ('express')
const fs = require ('fs')

const app  = express ()

app.use (express.json ())
app.use ('/', express.static ('public'))

const cartApi = '/api/cart'

app.get ('/api/catalog', (req, res) => {
    fs.readFile('server/db/catalog.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            res.send (data)
        }
    })
})

app.get (cartApi, (req, res) => {
    fs.readFile ('server/db/cart2.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            res.send (data)
        }  
    })
})

const cartCore = require ('./cartModule')

app.post (cartApi, (req, res) => {
    fs.readFile (cartCore.cartFile, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            let result = cartCore.add (JSON.parse (data), req)
            fs.writeFile (cartCore.cartFile, result, (err) => {
                if (err) {
                    res.sendStatus (500, JSON.stringify ({result: 0}))
                } else {
                    res.sendStatus (200, JSON.stringify ({result: 1}))
                }
            })
        }
    })
})

app.put (cartApi, (req, res) => {
    fs.readFile (cartCore.cartFile, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            let result = cartCore.put (JSON.parse (data), req) 
            fs.writeFile (cartCore.cartFile, result, (err) => {
                if (err) {
                    res.sendStatus (500, JSON.stringify ({result: 0}))
                } else {
                    res.sendStatus (200, JSON.stringify ({result: 1}))
                }
            })
        }
    })
})

app.delete(cartApi, (req, res) => {
    fs.readFile (cartCore.cartFile, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            let result = cartCore.del (JSON.parse (data), req)
            fs.writeFile (cartCore.cartFile, result, (err) => {
                if (err) {
                    res.sendStatus (500, JSON.stringify ({result: 0}))
                } else {
                    res.sendStatus (200, JSON.stringify ({result: 1}))
                }
            })
        }
    })  
})

app.listen (8080, () => {
    console.log ('server working')
})
