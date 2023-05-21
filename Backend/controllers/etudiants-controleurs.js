const { response } = require("express");
const { default: mongoose, mongo } = require("mongoose")
const { v4: uuidv4 } = require("uuid")

const HttpErreur = require("../models/http-erreur")
const Etudiant = require("../models/etudiants")







const getEtudiantById = async (requete, reponse, next) =>{
  const etudiantId = requete.params.etudiantId;
  let etudiant;
  try {
    etudiant = await Etudiant.findById(etudiantId);
  } catch(err){
      return next(
           new HttpErreur("Erreur de la récupération de l'étudiant", 500)
      );
  }
  if (!etudiant){
      return next(new HttpErreur("Aucun étudiant trouvé par l'id fourni", 404));
  }

  reponse.json({ etudiant: etudiant.toObject({ getters: true}) });
};




const creerEtudiant = async (requete, reponse, next) => {
    const { numero, nom, courrielEtu, profilEtu } = requete.body;
    const nouvelEtudiant = new Etudiant({

        numero,
        nom,
        courrielEtu,
        profilEtu,
    });
  
  
    try {
  
      
      await nouvelEtudiant.save();
      
    } catch (err) {
      const erreur = new HttpErreur("Création de l'étudiant échouée", 500);
      return next(erreur);
    }
    reponse.status(201).json({ etudiant: nouvelEtudiant });
  };






  const supprimerEtudiant = async (requete, reponse, next) =>{

    const etudiantId = requete.params.etudiantId;
  
    let etudiant;
    try {
      etudiant = await Etudiant.findById(etudiantId);
    } catch (err) {
      return next(new HttpErreur("Erreur de la récupération de l'étudiant", 500));
    }
  
    if (!etudiant) {
      return next(new HttpErreur("Aucun étudiant trouvé par l'id fourni", 404));
    }
  
    try {
      await Etudiant.findByIdAndDelete(etudiantId);
    } catch (err) {
      return next(new HttpErreur("Erreur de suppression de l'étudiant", 500));
    }
  
    reponse.status(200).json({ message: "Étudiant supprimé" });
  
      
  };
  const obtenirTousLesEtudiants = async (requete, reponse, suivant) => {
    let etudiants;
    try {
      etudiants = await Etudiant.find();
    } catch (err) {
      return suivant(new HttpErreur("Erreur lors de la récupération des étudiants", 500));
    }
    
    reponse.json({ etudiants: etudiants.map(etudiant => etudiant.toObject({ getters: true })) });
  };
  

  
  const updateEtudiant = async (requete, reponse, next) => {
    const {numero, nom, courrielEtu, profilEtu} = requete.body;
    const etudiantId = requete.params.etudiantId;

    let etudiant;

    try{
        etudiant = await Etudiant.findById(etudiantId);
        etudiant.numero  = numero
        etudiant.nom = nom
        etudiant.courrielEtu = courrielEtu
        etudiant.profilEtu = profilEtu
        await etudiant.save()
        
    }catch{
        return next(
            new HttpErreur("Erreur lors de la mise a jour de l'étudiant", 500)
        );
    }
    reponse.status(200).json({ etudiant: etudiant.toObject({ getters: true})
});

  }

  
  exports.getEtudiantById = getEtudiantById
  exports.creerEtudiant = creerEtudiant
  exports.supprimerEtudiant = supprimerEtudiant
  exports.obtenirTousLesEtudiants = obtenirTousLesEtudiants
  exports.updateEtudiant = updateEtudiant