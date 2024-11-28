import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', cors(), (req, res) => {
    res.status(200).send('Alive')
})

app.post('/', cors(), (req, res) => {
    console.log(req.body)
    res.status(200).send('Alive')
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8000, () => {
    console.log('Application deployed and listening on port 8000')
})

// node app.js // no realtime update
// npm run dev // includes real-time update
