# node-sheet-manager

![Version](https://img.shields.io/badge/Version-1.0.0-green)
![Update](https://img.shields.io/badge/Update-2022.03.12-blue)
[![CodeFactor](https://www.codefactor.io/repository/github/pepsizerosugar/node-sheet-manager/badge)](https://www.codefactor.io/repository/github/pepsizerosugar/node-sheet-manager)
![GitHub all releases](https://img.shields.io/github/downloads/pepsizerosugar/node-sheet-manager/total?color=orange)

* Sheet manager for work with Google Sheets
* Supports Google Sheets API v4
* This project is template of using Google Sheets API v4
* Make with
    * [express](https://expressjs.com/)
    * [googleapis](https://www.npmjs.com/package/googleapis)

## 0. Change Log

### version 1.0.0 (2022.03.12)

* Commit history
    * [pepsi-01] Init commit

<br>

## 1. Getting Started

### 1-1. Installation

1. Download the lastest version from [GitHub](https://github.com/pepsizerosugar/node-sheet-manager/releases) or Clone
   the repository.

### 1-2. How to use

1. Copy your own google api credential at key folder with name `credentials.json`
2. Run the following command to run the server.
   ```
    $node app.js
   ```
    1. Server is running default at localhost:3000
3. There is 3 method to use.
   1. The first method is to use the `GET` method.
      ```
       curl --location --request GET 'localhost:3000' \
       --header 'spreadsheetId: your sheet id' \
       --header 'sheetName: sheet name for get data' \
       --header 'sheetRange: **:**'
      ```
      This will get the sheet data.
   2. The second method is to use the `PUT` method.
      ```
       curl --location --request PUT 'localhost:3000' \
       --header 'spreadsheetId: your sheet id' \
       --header 'sheetName: sheet name for append data' \
       --header 'sheetRange: **:**' \
       --header 'Content-Type: application/json' \
       --data-raw '{
                   "data": [
                           ["1", "hello"],
                           ["2", "hi"]
                   ]
       }'
      ```
      This will `append` the data to the sheet.
   3. The third method is to use the `POST` method.
      ```
       curl --location --request POST 'localhost:3000' \
       --header 'spreadsheetId: your sheet id' \
       --header 'sheetName: sheet name for update data' \
       --header 'sheetRange: **:**' \
       --header 'Content-Type: application/json' \
       --data-raw '{
                   "data": [
                           ["1", "hello"],
                           ["2", "hi"]
                   ]
       }'
      ```
      This will `update` the data to the sheet.

### 1-3. Request data format

1. Header (Required)
    * `spreadsheetId`: your sheet id at last of url. (https://docs.google.com/spreadsheets/d/your-sheet-id/)
    * `sheetName`: sheet name for work.
    * `sheetRange`: range of data to work.
2. Body (When use `PUT` or `POST`)
    1. Must be json format.
        1. data: array of array.
        2. example
         ```
                {
                    "data": [
                            ["1", "hello"], <-- row
                            ["2", "hi"]
                    ]
                }
         ```
        3. Each array is mean one row of data what you want to put or update to sheet.