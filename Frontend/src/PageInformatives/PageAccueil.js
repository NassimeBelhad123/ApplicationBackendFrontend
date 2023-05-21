import React from "react"
import "./PageAccueil.css"

function Accueil(){
    return(
        <div className="description">
            <h1> Édition [ANNEE]</h1>
            <p>Bienvenue sur le site des stages de fin d'études des techniques de l'informatique du Collège Montmorency!
                À la fin de leurs études, les étudiants sont appelés à mettre en pratiwur les compétences acquises durant le programme.
                Cela se fait grâce à la participation d'entreprises de la région qui se accueillent afin de finaliser leurs formations.

                Le Collège Montmorency offre aux employeurs l'occasion d'obtenir une main-d"oeuvre compétente, tout en leur permettant de particier à la formation
                finale des étudiants. Le stage de fin d'études est une expérience concrète permettant d'acquérir une expérience professionnelle formatrice.
                Les étudiants terminent la portion académique de leurs études en informatique selon une des deux vois de sortie du programme: Réseau et sécurité informatique
                Développement d'applications informatiques.
            </p>
        </div>
    )
}

export default Accueil