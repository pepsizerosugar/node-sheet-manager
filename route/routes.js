const express = require('express');
const router = express.Router();

const {authentication} = require('../module/authentication');
const {getValues} = require('../module/get');
const {appendValues} = require('../module/append');
const {updateValues} = require('../module/update');

// get sheet values
router.get('/', async (req, res) => {
    try {
        const spreadsheetId = req.headers.spreadsheetid;
        const range = await getRange(req);
        const {sheets} = await authentication();
        const response = await getValues(sheets, spreadsheetId, range);
        const rows = response.data.values;

        if (rows) {
            console.info('[INFO] Successfully fetched rows from sheet');
            res.status(200).json(rows);
        } else {
            console.error('[ERROR] Failed to fetch rows from sheet');
            res.status(404).send({'message': 'No data found'});
        }
    } catch (e) {
        console.error(e)
        res.status(500).send({'message': 'Something went wrong when getting the data', 'error': e});
    }
});

// append sheet values
router.put('/', async (req, res) => {
    try {
        const spreadsheetId = req.headers.spreadsheetid;
        const range = await getRange(req);
        const json = req.body;
        const {sheets} = await authentication();
        const response = await appendValues(sheets, spreadsheetId, range, json);

        if (response.status === 200) {
            console.info('[INFO] Successfully appended data to sheet');
            res.send({'message': 'Success'});
        } else {
            console.error('[ERROR] Failed to append data to sheet');
            res.status(404).send({'message': 'Fail'});
        }
    } catch (e) {
        let error = e.response.data.error.message.replace(/\n/g, '');
        console.error(error);
        res.status(500).send({'message': 'Something went wrong when appending', error});
    }
});

// update sheet values
router.post('/', async (req, res) => {
    try {
        const spreadsheetId = req.headers.spreadsheetid;
        const range = await getRange(req);
        const json = req.body;
        const {sheets} = await authentication();
        const response = await updateValues(sheets, spreadsheetId, range, json);

        if (response.status === 200) {
            console.info('[INFO] Successfully updated data to sheet');
            res.send({'message': 'Success'});
        } else {
            console.error('[ERROR] Failed to update data to sheet');
            res.status(404).send({'message': 'Fail'});
        }
    } catch (e) {
        let error = e.response.data.error.message.replace(/\n/g, '');
        console.error(error);
        res.status(500).send({'message': 'Something went wrong when updating', error});
    }
});

// get range
async function getRange(req) {
    let sheet = req.headers.sheetname;
    let range = req.headers.sheetrange;

    if (sheet && range)
        return await sheet + '!' + range;
    if (!sheet)
        throw new Error('No sheetname');
    if (!range)
        throw new Error('No sheetrange');
}

module.exports = router;