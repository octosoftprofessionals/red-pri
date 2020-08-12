const router = require('express-promise-router')();
const SearchController = require('../controllers/search');

router.route('/').get(SearchController.index);

module.exports = router;
