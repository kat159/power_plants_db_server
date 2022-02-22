const fuelsModel = require('../model/fuelModel');
const moment = require('moment');

class FuelService {
    constructor() {

    }
    async getFuels(req, res, next) {
        const name = req.query.name;
        if (name !== undefined) {
            // get specific fuel by name
            const { results } = await fuelsModel.findByName(name);
            if (results.length === 0) res.json({ message: 'fuel not found', err_code: 1, results: [] });
            else res.json({ results: results, err_code: 0 });
        } else {
            // get all fuels
            const { results } = await fuelsModel.findAll();
            res.json({ results: results, err_code: 0 });
        }
    }

    async getFuelById(req, res, next) {
        const id = req.params.id;
        const { results } = await fuelsModel.findById(id);
        if (results.length === 0) res.json({ message: 'fuel not found', err_code: 1, results: [] });
        else res.json({ results: results, err_code: 0 });
    }

    async addFuel(req, res, next) {
        const { body } = req;
        console.log(body);

        const { results } = await fuelsModel.findByName(body.name);

        if (results.length !== 0) {
            res.json({ message: 'name exists', err_code: 1 });
        } else {
            const { results } = await fuelsModel.create(body);
            console.log(results);
            res.json({ message: 'Succesfully add fuel', err_code: 0 });
        }

    }

    async updateFuelByName(req, res, next) {
        // update password, won't change name
        const { body } = req;
        const { results } = await fuelsModel.findByName(body.name);
        const result = results[0];
        if (results.length === 0) {
            res.json({ message: 'name not found' });
        } else {
            const { results } = await fuelsModel.updateById(body, result.fuel_id);
            res.json({ message: 'successfully update fuel' });
        }

    }

    async updateFuelById(req, res, next) {
        const { body } = req;
        const { id } = req.params;
        const { results } = await fuelsModel.findByName(body.name);
        if (results.length !== 0 && results[0].fuel_id != id) {
            res.json({ message: 'name exists' });
        } else {
            const { results } = await fuelsModel.updateById(body, id);
            if (results.affectedRows !== 1) res.json({ message: 'fuel_id not found' });
            else res.json({ message: 'successfully update fuel' });
        }
    }

    async deleteFuelById(req, res, next) {
        const { id } = req.params;
        const { results } = await fuelsModel.deleteById(id);
        if (results.affectedRows !== 1) return res.json({ message: 'Delete failed' });
        else res.json({ message: 'Successfully delete fuel' });
    }
}

module.exports = new FuelService();