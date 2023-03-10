const {Router} = require('express');

const MovieController = require('./app/controllers/MovieController');

const router = Router();

router.get('/movies', MovieController.index);
router.get('/movies/:id', MovieController.show);
router.post('/movies', MovieController.store);
router.delete('/movies/:id', MovieController.delete);
router.put('/movies/:id', MovieController.update);

module.exports = router;
