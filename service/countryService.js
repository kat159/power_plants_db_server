const countryModel = require('../model/countryModel')

class FuelService {
    constructor() {

    }
    async getCountries(req, res, next) {
        const { results } = await countryModel.findAll(req.query);
        res.json({ results: results, err_code: 0 });
    }
}

module.exports = new FuelService();