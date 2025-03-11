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
    const today = dates[0];
    const limit = today-(days*24*3600); // Transform days to seconds
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

export function itom(month) {
    // Integer to Month from index
    if (!(0 <= month <= 11)) {
        return `undef_month_{${month}}`
        // Necessary return, even if wrong value
    }

    return ["january", "february", "march", "april",
        "may", "june", "july", "august", "september",
        "october", "november", "december"
    ].at(month);
}

export async function backup_monthly(filename) {
    try {
        await fs.copyFile("log.txt", "archives/"+filename);
        console.log("Successfull monthly backup for file : "+filename);
        await fs.writeFile("");
        console.log("Successfully flushed main log file");
    } catch (err) {
        console.error("Error copying monthly backup file : "+filename, err);
    }
}
