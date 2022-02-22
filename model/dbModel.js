const fuelModel = require('./fuelModel')
const fuelPlantModel = require('./fuelPlantModel')
const generationModel = require('./generationModel')
const plantModel = require('./plantModel')
const db = require('../config/db');


module.exports = {
    importCSV(path) {
        const fs = require('fs')
        const { parse } = require('csv-parse')
        fs.readFile(path, (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            parse(data, { columns: false, trim: true }, function (err, rows) {
                // Your CSV data is in an array of arrys passed to this callback as rows.
                let counter = 0;
                for (const row of rows) {
                    if (counter++ === 0) continue;
                    // console.log(row);
                    const plantData = {
                        country: row[0],
                        name: row[1],
                        latitude: row[2] === '' ? -1 : row[2],
                        longitude: row[3] === '' ? -1 : row[3],
                        date_of_construction: row[8] == '' ? null : row[8],
                    }
                    const fuels = [row[4], row[5], row[6], row[7]];
                    const generations = [row[9], row[10], row[11], row[12]];
                    if (counter >= 2) {
                        plantModel.create(plantData).then(
                            result1 => {
                                const { insertId } = result1.results;
                                // console.log('insertId:', insertId);
                                for (const fuel of fuels) {
                                    if (fuel === '') continue;
                                    fuelModel.findByName(fuel).then(
                                        result => {
                                            const { results } = result;
                                            // console.log('RES', results);
                                            fuelModel.createIgnore({ name: fuel }).then(
                                                _ => {
                                                    fuelPlantModel.create(insertId, fuel)
                                                }
                                            )
                                        }
                                    )
                                }
                            }
                        );
                    }
                }
            })
            // console.log(await neatCsv(data))
        })
    }
}