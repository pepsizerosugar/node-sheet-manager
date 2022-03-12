const { google } = require('googleapis');

async function authentication() {
    const auth = new google.auth.GoogleAuth({
        keyFile: './key/credentials.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    console.info('[INFO] Authentication success, returning sheets object');

    return { sheets };
}

module.exports = {
    authentication
};