const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/add', transactionController.addTransaction);
router.get('/history', transactionController.getHistory);

module.exports = router;
