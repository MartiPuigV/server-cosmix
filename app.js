import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { addDate, retrieveUploads, getLastDays, itom, backup_monthly } from './methods.js'

dotenv.config()

const app = express()
const router = express.Router()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const prev_date = new Date()

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', cors(), (_, res) => {
    res.status(200).send('Alive')
})

app.get('/dev/log.txt', cors(), (req, res) => {
    res.status(200).sendFile(path.resolve('./log.txt'));
})

app.get('/epoch', cors(), (_, res) => {
    // Retrieve epoch in seconds
    const epoch = Date.now()/1000;
    res.status(200).send(String(epoch));
})

app.post('/muons-upload', cors(), async (req, res) => {
    // Upload a new value if API key is valid
    const { secret, date } = req.body

    if (secret != process.env.SECRET) {
        res.status(401).send('Unauthorized::Nice try');
        return;
    }

    const month = new Date(date*1000);

    if (month.getMonth() != prev_date.getMonth()) {
        console.log('New month, we need to change log files');
        let filename = itom(prev_date.getMonth());
        filename += `_${prev_date.getFullYear()}.txt`
        await backup_monthly(filename);
    }

    await addDate(date);

    res.status(200).send('Muons enregistrés!');
})

app.get('/muons/:quantity', cors(), async (req, res) => {
    // Retrieve the latest 'n' coincidences
    const quantity = req.params.quantity;
    try {
        const lines = await retrieveUploads(quantity);
        res.status(200).send(lines);
    } catch(error) {
        console.error(error);
        res.status(500).send('Error reading file');
    }
})

app.get('/days/:days', cors(), async (req, res) => {
    // Retrieve last coincidences during the last 'n' days
    const days = req.params.days;
    try {
        const lines = await getLastDays(days);
        res.status(200).send(lines);
    } catch(error) {
        console.error(error);
        res.status(500).send('Error reading file');
    }
})

app.get('/archives/:archive', cors(), (req, res) => {
    const archive = req.params.archive;
    const filepath = path.join(__dirname, archive)
})

router.get('/dashboard', cors(), function(req, res) {
    res.sendFile(path.resolve('index.html'));
})

router.get('/data', cors(), function(req, res) {
    res.sendFile(path.resolve('data.html'));
})

app.use((err, req, res, _) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.use('/', cors(), router);

app.listen(process.env.PORT, () => {
    console.log('Application deployed with utmost success')
})

// Run command : node app.js
