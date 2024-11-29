import express from 'express'
import cors from 'cors'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', cors(), (req, res) => {
    res.status(200).send('Alive')
})

app.post('/', cors(), (req, res) => {
    const { secret, date } = req.body
    if (secret != process.env.SECRET) {
        res.status(500).send('Nice try')
    }
    console.log(req.body)
    fs.appendFile('log.txt', date+'\n', (err) => {
        if (err) {
            console.error('Error:', err);
        } else {
            console.log('File written successfully!');
        }
    });
    res.status(200).send('Alive')
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(process.env.PORT, () => {
    console.log('Application deployed and listening on port 8000 most likely')
})

// node app.js // no realtime update
// npm run dev // includes real-time update
