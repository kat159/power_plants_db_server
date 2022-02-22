const plantsModel = require('../model/plantModel');
const moment = require('moment');
const fuelPlantModel = require('../model/fuelPlantModel');
const fuelModel = require('../model/fuelModel');

class PlantService {
    constructor() {

    }
    getPlantNameByName(req, res, next) {
        console.log(33333333333);
        plantsModel.getNameByName(req.query).then(
            result => {
                const {results} = result
                res.json({results: results, err_code: 0});
            }
        )
    }

    async getPlants(req, res, next) {
        const { results } = await plantsModel.findAll(req.query);
        for (let result of results) {
            result.fuels = result.fuels.split(',');
            const { fuels } = result;
        }
        res.json({ results: results, err_code: 0 });
    }

    async getPlantById(req, res, next) {
        const id = req.params.id;
        const { results } = await plantsModel.findById(id);
        if (results.length === 0) res.json({ message: 'plant not found', err_code: 1, results: [] });
        else res.json({ results: results, err_code: 0 });
    }

    async addPlant(req, res, next) {
        const { body } = req;
        console.log(body);
        let { results } = await plantsModel.findByName(body.name);

        if (results.length !== 0) {
            res.json({ message: 'name exists', err_code: 1 });
        } else {
            const { fuel } = body;
            if (fuel === undefined) {
                res.json({ message: 'fuel is required', err_code: 1 });
                return
            }
            let fuels = fuel.split(';');
            for (let fuel1 of fuels) {
                let results = (await fuelModel.findByName(fuel1)).results;
                console.log('RESULT_1:', results);
                if (results.length === 0) {
                    res.json({ message: `fuel [${fuel1}] not found, you may need to create the corresponding fuel first`, err_code: 1 });
                    return
                }
            }
            delete body.fuel;
            results = (await plantsModel.create(body)).results;
            console.log('RES_2:', results);
            for (let fuel1 of fuels) {
                await fuelPlantModel.create(results.insertId, fuel1);
            }
            res.json({ message: 'Succesfully add plant', err_code: 0 });
        }

    }

    async updatePlantByName(req, res, next) {
        // update password, won't change name
        const { body } = req;
        const { results } = await plantsModel.findByName(body.name);
        const result = results[0];
        if (results.length === 0) {
            res.json({ message: 'name not found', err_code: 1 });
        } else {
            const { results } = await plantsModel.updateById(body, result.plant_id);
            res.json({ message: 'successfully update plant', err_code: 0 });
        }

    }

    async updatePlantById(req, res, next) {
        const { body } = req;
        const { id } = req.params;
        const { results } = await plantsModel.findByName(body.name);
        if (results.length !== 0 && results[0].plant_id != id) {
            res.json({ message: 'name exists' });
        } else {
            const { results } = await plantsModel.updateById(body, id);
            if (results.affectedRows !== 1) res.json({ message: 'plant_id not found', err_code: 1 });
            else res.json({ message: 'successfully update plant', err_code: 0 });
        }
    }

    async deletePlantById(req, res, next) {
        const { id } = req.params;
        const { results } = await plantsModel.deleteById(id);
        if (results.affectedRows !== 1) return res.json({ message: 'Delete failed', err_code: 1 });
        else res.json({ message: 'Successfully delete plant', err_code: 0 });
    }
}

module.exports = new PlantService();