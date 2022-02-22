const express = require('express');
const router = express.Router();
const { getGenerations, getGenerationById, addGeneration, updateGenerationById, updateGenerationByName, deleteGenerationById } = require('../service/generationService');

/* GET generations listing. */
router.get('/', getGenerations);
router.get('/:id', getGenerationById);
router.post('/', addGeneration);
router.put('/:id', updateGenerationById);
router.put('/', updateGenerationByName);
router.delete('/:id', deleteGenerationById);
 
module.exports = router; 
 