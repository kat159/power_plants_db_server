const express = require('express');
const router = express.Router();
const { getPlantNameByName } = require('../service/keywordRefService');

/* GET plants listing. */
router.get('/plants', getPlantNameByName);
 
module.exports = router; 
 