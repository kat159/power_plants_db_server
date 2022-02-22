const fuelModel = require('./fuelModel')
const plantModel = require('./plantModel')
const db = require('../config/db')

module.exports = {
    async create(plant_id, fuel_name) {
        // console.log('11111', plant_id, fuel_name);
        const { results } = await fuelModel.findByName(fuel_name);
        const { fuel_id } = results[0];
        const sql = 'insert into plant_fuels set ?'
        return db.query(sql, { plant_id: plant_id, fuel_id: fuel_id });
    }
}