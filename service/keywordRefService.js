const keywordRefModel = require("../model/keywordRefModel");


class PlantService {
    constructor() {

    }
    getPlantNameByName(req, res, next) {
        console.log(33333333333);
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
}

module.exports = new PlantService();