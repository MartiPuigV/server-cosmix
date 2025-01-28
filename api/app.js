import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { addDate, retrieveUploads } from './methods.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', cors(), (_, res) => {
    res.status(200).send('Alive')
})

app.get('/dev/log.txt', cors(), (req, res) => {
    const API_KEY = req.query.API_KEY;
    if (!API_KEY || API_KEY != process.env.SECRET) {
        res.status(401).send('Unauthorized::Nice try');
        return;
    } else {
        res.status(200).sendFile(path.resolve('./log.txt'));
        return;
    }
})

app.get('/epoch', cors(), (_, res) => {
    const epoch = Date.now()/1000;
    res.status(200).send(String(epoch));
})

app.post('/muons-upload', cors(), async (req, res) => {
    const { secret, date } = req.body

    if (secret != process.env.SECRET) {
        res.status(401).send('Unauthorized::Nice try');
        return;
    }

    await addDate(date);
    console.log('Recieved muons correctly!');

    res.status(200).send('Muons enregistrés!');
})

app.get('/muons/:quantity', cors(), async (req, res) => {
    const quantity = req.params.quantity;
    try {
        const lines = await retrieveUploads(quantity);
        res.status(200).send(lines);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error reading file');
    }
})

app.use((err, _, res, _) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(process.env.PORT, () => {
    console.log('Application deployed with utmost success')
})

// node app.js
