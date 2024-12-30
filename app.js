import express from 'express'
import cors from 'cors'
import fs from 'fs'
import dotenv from 'dotenv'
import { removeCarriageReturn } from './methods.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', cors(), (req, res) => {
    res.status(200).send('Alive')
})

app.post('/muons-upload', cors(), (req, res) => {
    const { secret, date } = req.body

    if (secret != process.env.SECRET) {
        res.status(500).send('Nice try')
    }

    fs.appendFile('log.txt', date+'\n', (err) => {
        if (err) {
            console.error('Error:', err);
        } else {
            console.log('Recieved muons correctly!');
        }
    });
    res.status(200).send('Muons enregistrés!')
})

app.get('/muons/:quantity', cors(), (req, res) => {
    const quantity = req.params.quantity
    fs.readFile('log.txt', 'utf-8', (err, data) => {
        if (err) throw err;
        let lines = data.split('\n')
        lines = lines.slice(-quantity-1, -1)
        lines = removeCarriageReturn(lines)
        res.status(200).send(lines)
    })
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(process.env.PORT, () => {
    console.log('Application deployed with utmost success')
})

// node app.js // no realtime update
// npm run dev // includes real-time update
