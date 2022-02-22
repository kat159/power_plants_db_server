const express = require('express');
const router = express.Router();
const { getPlants, getPlantById, addPlant, updatePlantById, updatePlantByName, deletePlantById, getPlantNameByName } = require('../service/plantService');

/* GET plants listing. */
router.get('/', getPlants);
router.get('/:id', getPlantById);
router.post('/', addPlant);
router.put('/:id', updatePlantById);
router.put('/', updatePlantByName);
router.delete('/:id', deletePlantById);
 
module.exports = router; 
 