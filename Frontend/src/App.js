import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import PageAccueil from './PageInformatives/PageAccueil'
import MainNavigation from './shared/Navigation/MainNavigation';
import Deroulement from './PageInformatives/Deroulement';

import FAQ from './PageInformatives/FAQ';
import Footer from "./shared/Pied/Footer"




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

                        <Route path = "/FAQ">
                            <FAQ />
                        </Route>

                 


               
                     
                        <Redirect to="/" />
                    </Switch>
                </main>
                <Footer />
        </Router>
    )
}


export default App;