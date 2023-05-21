const express = require("express");

const controleurStage = require("../controllers/stages-controleur")
const router = express.Router();

router.post('/', controleurStage.creerStage);
router.get("/:stageId", controleurStage.getStageById);
router.delete('/:stageId', controleurStage.supprimerStage);
router.get('/', controleurStage.obtenirTousLesStages);
router.patch('/:stageId', controleurStage.updateStage);


module.exports = router