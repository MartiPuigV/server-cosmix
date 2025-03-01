import fs from 'fs/promises'

function removeCarriageReturn(strings) {
    return strings.map(str => str.replace(/\r$/, ''));
}

export async function addDate(date) {
    fs.appendFile('log.txt', date+'\n', (err) => {
        console.error(err);
    });
}

export async function retrieveUploads(amount) {
    try {
        const data = await fs.readFile('log.txt', 'utf-8');
        let lines = data.split('\n');
        if (amount != 0) {
            lines = lines.slice(-amount-1, -1);
        }
        lines.reverse();
        lines = removeCarriageReturn(lines);
        return lines;
    } catch (error) {
        console.error('Error reading file:', error);
        throw error;
    }
}

export async function getLastDays(days) {
    const dates = await retrieveUploads(0);
    console.log(dates);
    const today = dates[0];
    console.log(today);
    const limit = today-(days*24*3600); // Transform days to seconds
    console.log(limit);
    let result = [];
    dates.forEach(day => {
        if (day > limit) {
            result.push(day);
        } else {
            return
        }
    });
    return result;
}
