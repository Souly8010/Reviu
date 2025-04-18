const express = require('express');
const router = express.Router();
const auditController = require('../controllers/auditController');
const auth = require('../middleware/auth');

router.get('/', auth, auditController.getAudits);
router.post('/', auth, auditController.createAudit);

module.exports = router;
