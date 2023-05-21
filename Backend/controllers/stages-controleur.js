const { response } = require("express");
const { default: mongoose, mongo } = require("mongoose")
const { v4: uuidv4 } = require("uuid")

const HttpErreur = require("../models/http-erreur")
const Stage = require("../models/stages")







const getStageById = async (requete, reponse, next) =>{
  const stageId = requete.params.stageId;
  let stage;
  try {
    stage = await Stage.findById(stageId);
  } catch(err){
      return next(
           new HttpErreur("Erreur de la récupération du stage", 500)
      );
  }
  if (!stage){
      return next(new HttpErreur("Aucun stage trouvé par l'id fourni", 404));
  }

  reponse.json({ stage: stage.toObject({ getters: true}) });
};




const creerStage = async (requete, reponse, next) => {
    const { contact, courriel, numero, entreprise,adresse,type,postesDispo,description,remuneration } = requete.body;
    const nouveauStage = new Stage({

        contact,
        courriel,
        numero,
        entreprise,
        adresse,
        type,
        postesDispo,
        description,
        remuneration,

    });
  
  
    try {
  
      
      await nouveauStage.save();
      
    } catch (err) {
      const erreur = new HttpErreur("Création du stage échouée", 500);
      return next(erreur);
    }
    reponse.status(201).json({ stage: nouveauStage });
  };






  const supprimerStage = async (requete, reponse, next) =>{

    const stageId = requete.params.stageId;
  
    let stage;
    try {
      stage = await Stage.findById(stageId);
    } catch (err) {
      return next(new HttpErreur("Erreur de la récupération du stage", 500));
    }
  
    if (!stage) {
      return next(new HttpErreur("Aucun étudiant trouvé par l'id fourni", 404));
    }
  
    try {
      await Stage.findByIdAndDelete(stageId);
    } catch (err) {
      return next(new HttpErreur("Erreur de suppression du stage", 500));
    }
  
    reponse.status(200).json({ message: "Stage supprimé" });
  
      
  };
  const obtenirTousLesStages = async (requete, reponse, suivant) => {
    let stages;
    try {
      stages = await Stage.find();
    } catch (err) {
      return suivant(new HttpErreur("Erreur lors de la récupération des stages", 500));
    }
    
    reponse.json({ stages: stages.map(stage => stage.toObject({ getters: true })) });
  };
  

  
  const updateStage = async (requete, reponse, next) => {
    const {contact,courriel,numero,entreprise,adresse,type,postesDispo,description,remuneration} = requete.body;
    const stageId = requete.params.stageId;

    let stage;

    try{
        stage = await Stage.findById(stageId);
        stage.contact  = contact
        stage.courriel = courriel
        stage.numero = numero
        stage.entreprise = entreprise
        stage.adresse=adresse
        stage.type =type
        stage.postesDispo = postesDispo
        stage.description = description
        stage.remuneration =remuneration
        await stage.save()
        
    }catch{
        return next(
            new HttpErreur("Erreur lors de la mise a jour du stage", 500)
        );
    }
    reponse.status(200).json({ stage: stage.toObject({ getters: true})
});

  }

  
  exports.getStageById = getStageById
  exports.creerStage = creerStage
  exports.supprimerStage = supprimerStage
  exports.obtenirTousLesStages = obtenirTousLesStages
  exports.updateStage = updateStage