async function getValues(sheets, spreadsheetId, range) {
    console.info(`[INFO] getValues(${spreadsheetId}, ${range})`);

    return await sheets.spreadsheets.values.get({
        spreadsheetId,
        range
    });
}

module.exports = {
    getValues
};