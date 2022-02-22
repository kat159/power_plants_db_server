const express = require('express');
const router = express.Router();
const { getCountries } = require('../service/countryService');

/* GET plants listing. */
router.get('/', getCountries);
 
module.exports = router; 
 