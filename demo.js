const dbModel = require('./model/dbModel')

const path = './global_power_plant_database.csv';
// dbModel.importCSV(path)

const func = (a, b) => {
    console.log(a ? a : 1);
}
func();