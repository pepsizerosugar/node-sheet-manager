async function updateValues(sheets, spreadsheetId, range, json) {
    let values = [];
    let data = json.data

    if (data.length > 1) {
        data.forEach(row => {
            values.push(Object.values(row));
        });
    } else {
        values = [Object.values(data)];
    }

    console.info(`[INFO] Updating ${values.length} rows in ${range}`);

    /*
     * valueInputOption: 'USER_ENTERED' means that parse the value as if the user entered it into the UI.
     *                   'RAW' means that parse the value as if it is a literal value.
     */
    return await sheets.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        resource: {values}
    });
}

module.exports = {
    updateValues
};