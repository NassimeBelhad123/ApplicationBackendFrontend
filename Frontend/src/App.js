import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import PageAccueil from './PageInformatives/PageAccueil'
import MainNavigation from './shared/Navigation/MainNavigation';
import Deroulement from './PageInformatives/Deroulement';
import ProfilEtCompetence from './PageInformatives/ProfilEtCompetence';
import FAQ from './PageInformatives/FAQ';
import Footer from "./shared/Pied/Footer"
import NewStudent from './Etudiants/pages/NouvelEtudiant';
import MesEtudiants from './Etudiants/pages/MesEtudiants';
import UpdateEtudiant from './Etudiants/pages/UpdateEtudiant';
import MesStages from "./Stages/pages/MesStages"
import UpdateStages from "./Stages/pages/UpdateStages"
import TexteformulaireEmployeurs from './PageInformatives/TexteFormulaireEmployeurs';
import NewStage from './Stages/pages/NouveauStage';



function App(){
    return(
        <Router>
            <MainNavigation />
                <main>
                    <Switch>
                        <Route path = "/" exact>
                            <PageAccueil />
                        </Route>

                        <Route path = "/deroulement">
                            <Deroulement />
                        </Route>

                        <Route path = "/profil&competence">
                            <ProfilEtCompetence />
                        </Route>

                        <Route path = "/texteFormulaireEmployeurs">
                            <TexteformulaireEmployeurs/>
                        </Route>

                        <Route path = "/FAQ">
                            <FAQ />
                        </Route>

                        <Route path = "/NouveauStage">
                            <NewStage />
                        </Route>

                        <Route path="/ListeStages">
                            <MesStages />
                        </Route>

                        <Route path = "/stages/:stageId">
                            <UpdateStages />
                        </Route>



                        <Route path = "/NouvelEtudiant">
                            <NewStudent />
                        </Route>
                        <Route path="/ListeEtudiants" exact>
                            <MesEtudiants />
                        </Route>
                        <Route path="/etudiants/:etudiantId">
                            <UpdateEtudiant />
                        </Route>
                     
                        <Redirect to="/" />
                    </Switch>
                </main>
                <Footer />
        </Router>
    )
}


export default App;