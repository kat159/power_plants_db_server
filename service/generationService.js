const generationsModel = require('../model/generationModel');
const moment = require('moment');

class GenerationService {
    constructor() {

    }
    async getGenerations(req, res, next) {
        const name = req.query.name;
        if (name !== undefined) {
            // get specific generation by name
            const { results } = await generationsModel.findByName(name);
            if (results.length === 0) res.json({ message: 'generation not found', err_code: 1, results: [] });
            else res.json({ results: results, err_code: 0 });
        } else {
            // get all generations
            const { results } = await generationsModel.findAll();
            res.json({ results: results, err_code: 0 });
        }
    }

    async getGenerationById(req, res, next) {
        const id = req.params.id;
        const { results } = await generationsModel.findById(id);
        if (results.length === 0) res.json({ message: 'generation not found', err_code: 1, results: [] });
        else res.json({ results: results, err_code: 0 });
    }

    async addGeneration(req, res, next) {
        const { body } = req;
        console.log(body);
        const { results } = await generationsModel.create(body);
        console.log(results);
        res.json({ message: 'Succesfully add generation', err_code: 0 });

    }

    async updateGenerationByName(req, res, next) {
        // update password, won't change name
        const { body } = req;
        const { results } = await generationsModel.findByName(body.name);
        const result = results[0];
        if (results.length === 0) {
            res.json({ message: 'name not found' });
        } else {
            const { results } = await generationsModel.updateById(body, result.generation_id);
            res.json({ message: 'successfully update generation' });
        }

    }

    async updateGenerationById(req, res, next) {
        const { body } = req;
        const { id } = req.params;
        const { results } = await generationsModel.findByName(body.name);
        if (results.length !== 0 && results[0].generation_id != id) {
            res.json({ message: 'name exists' });
        } else {
            const { results } = await generationsModel.updateById(body, id);
            if (results.affectedRows !== 1) res.json({ message: 'generation_id not found' });
            else res.json({ message: 'successfully update generation' });
        }
    }

    async deleteGenerationById(req, res, next) {
        const { id } = req.params;
        const { results } = await generationsModel.deleteById(id);
        if (results.affectedRows !== 1) return res.json({ message: 'Delete failed' });
        else res.json({ message: 'Successfully delete generation' });
    }
}

module.exports = new GenerationService();