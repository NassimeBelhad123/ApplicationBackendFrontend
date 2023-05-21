const express = require("express");

const controleurEtudiant = require("../controllers/etudiants-controleurs")
const router = express.Router();

router.post('/', controleurEtudiant.creerEtudiant);
router.get("/:etudiantId", controleurEtudiant.getEtudiantById);
router.delete('/:etudiantId', controleurEtudiant.supprimerEtudiant);
router.get('/', controleurEtudiant.obtenirTousLesEtudiants);
router.patch('/:etudiantId', controleurEtudiant.updateEtudiant);


module.exports = router