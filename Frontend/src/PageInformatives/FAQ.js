import React from "react"
import "./FAQ.css"

function Faq(){
    return(
        <div className = "centrage">
            
			  <h2>Foire aux questions - FAQ</h2>


			  <p styleClass = "question">-Est-ce que le stage est obligatoire?</p> 
               
				 
			  <p styleClass = "reponse">Le stage de fin d'études en informatique est obligatoire 
			  pour l'obtention du diplôme collgégial.
              </p>

              <br />
              <p styleClass = "question"> -Quel est l'horaire de l'étudiant durant les stages?</p>
				 
			  <p styleClass = "reponse"> L'étudiant doit respecter l'horaire de l'entreprise durant son stage. </p>


              <br />
			    <p styleClass = "question">-Est-ce que l'étudiant travaille pendant les journées pédagogiques et
			  les journées de rattrapage?
				 
              </p>

			  <p styleClass = "reponse"> L'étudiant doit respecter l'horaire de l'entreprise durant son stage et ce même
			  durant les journées pédagogiques et de rattrapage. </p>



              <br />
			   <p styleClass = "question"> -Quelle est la durée d'un stage de fin d'études?</p>
				 
			   <p styleClass = "reponse">La durée du stage est de 15 semaines pour les deux profils de sortie (réseaux et programmation). </p>


               <br />

			    <p styleClass = "question">-Quelles sont les dates prévues pour les stages?</p>
				 
                <p styleClass = "reponse"> Les stages sont prévus du 21 janvier au 3 mai 2019. </p>


        </div>
        
    )
}

export default Faq