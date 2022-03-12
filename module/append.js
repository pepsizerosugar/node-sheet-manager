async function appendValues(sheets, spreadsheetId, range, json) {
    let values = [];
    let data = json.data

    if (data.length > 1) {
        data.forEach(row => {
            values.push(Object.values(row));
        });
    } else {
        values = [Object.values(data)];
    }

    console.info(`[INFO] Appending ${values.length} rows in ${range}`);

    /*
     * valueInputOption: 'USER_ENTERED' means that parse the value as if the user entered it into the UI.
     *                   'RAW' means that parse the value as if it is a literal value.
     * insertDataOption: 'INSERT_ROWS' means that insert the data the cell format of the row immediately above the row where input is to be started is followed as it is.
     *                   'OVERWRITE' means that the cell format of the row where input is to be started is followed as it is.
     */
    return await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        resource: {values}
    });
}

module.exports = {
    appendValues
};