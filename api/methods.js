export function removeCarriageReturn(strings) {
    return strings.map(str => str.replace(/\r$/, ''));
}