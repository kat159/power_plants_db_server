const keywordRefModel = require("../model/keywordRefModel");


class PlantService {
    constructor() {

    }
    getPlantNameByName(req, res, next) {
        keywordRefModel.getPlantNameByName(req.query).then(
            result => {
                const {results} = result
                const finalRes = []
                for (let tmp of results) {
                    finalRes.push(tmp.name);
                }
                res.json({results: finalRes, err_code: 0});
            }
        )
    }
    getCountryNameByName(req, res, next) {
        keywordRefModel.getCountryNameByName(req.query).then(
            result => {
                const {results} = result
                const finalRes = []
                for (let tmp of results) {
                    finalRes.push(tmp.country);
                }
                res.json({results: finalRes, err_code: 0});
            }
        )
    }
    getFuelNameByName(req, res, next) {
        keywordRefModel.getFuelNameByName(req.query).then(
            result => {
                const {results} = result
                const finalRes = []
                for (let tmp of results) {
                    finalRes.push(tmp.fuel);
                }
                res.json({results: finalRes, err_code: 0});
            }
        )
    }
}

module.exports = new PlantService();