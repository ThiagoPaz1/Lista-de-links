const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/', linkController.allLinks);
router.get('/add', (_req, res) => res.render("add"));
router.get('/:title', linkController.redirect);
router.get('/edit/:id', linkController.loadLink);

router.post('/', express.urlencoded({ extended: true }), linkController.linkAdd);
router.post('/edit/:id', express.urlencoded({ extended: true }), linkController.editLink);

router.delete('/:id', linkController.deleteLink);
// router.delete('/', linkController.deleteLink);

module.exports = router;