const express = require('express');
const router = express.Router();
const { getPlantNameByName, getCountryNameByName, getFuelNameByName } = require('../service/keywordRefService');

/* GET plants listing. */
router.get('/plants', getPlantNameByName);
router.get('/countries', getCountryNameByName);
router.get('/fuels', getFuelNameByName);
 
module.exports = router; 
 