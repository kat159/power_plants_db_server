const express = require('express');
const router = express.Router();
const { getFuels, getFuelById, addFuel, updateFuelById, updateFuelByName, deleteFuelById } = require('../service/fuelService');

/* GET fuels listing. */
router.get('/', getFuels);
router.get('/:id', getFuelById);
router.post('/', addFuel);
router.put('/:id', updateFuelById);
router.put('/', updateFuelByName);
router.delete('/:id', deleteFuelById);
 
module.exports = router; 
 