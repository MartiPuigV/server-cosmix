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
        lines = lines.slice(-amount-1, -1);
        lines.reverse();
        lines = removeCarriageReturn(lines);
        return lines;
    } catch (error) {
        console.error('Error reading file:', error);
        throw error;
    }
}