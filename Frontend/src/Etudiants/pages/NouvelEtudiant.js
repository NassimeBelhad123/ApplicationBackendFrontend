import React, { useContext} from 'react';

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Input from '../../shared/FormElements/Input';
import Button from '../../shared/FormElements/Button';
import {VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH, VALIDATOR_EMAIL} from '../../shared/util/validators';
import ErrorModal from "../../shared/ErrorModal"
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Select from '../../Stages/Select';
import './NouvelEtudiant.css';




const NewStudent = () =>{

    const { error, sendRequest, clearError } = useHttpClient();
    const[formState, inputHandler] = useForm(
        {
            numeroDA:{
                value:'',
                isValid: false
            },

            nomEtudiant:{
                value:'',
                isValid: false
            },

            courrielEtudiant:{
                value:'',
                isValid: false
            },

            profilEtudiant:{
                value:'',
                isValid: false
            },

            

        },
        false
    );

    const history = useHistory();

    const etudiantSubmitHandler  = async event =>  {
        event.preventDefault();
        console.log(formState.inputs); // send this to the backend!
    
        try {
          const reponseData = await sendRequest(
            "http://localhost:5000/api/etudiants/",
            "POST",
            JSON.stringify({
              numero: formState.inputs.numeroDA.value,
              nom: formState.inputs.nomEtudiant.value,
              courrielEtu: formState.inputs.courrielEtudiant.value,
              profilEtu: formState.inputs.profilEtudiant.value,
              
            }),
            {
              "Content-Type": "application/json",
            }
          );
    
          console.log(reponseData);
          history.push("/ListeEtudiants");
        } catch (err) {
          console.log(err);
        }
      };


    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
        <form className="place-form" onSubmit={etudiantSubmitHandler}>
            <Input
                id="numeroDA"
                element="input"
                type="number"
                label="Numero de l'étudiant"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrez un numéro valide"
                onInput={inputHandler}
            />

            <Input
                id="nomEtudiant"
                element="input"
                type="text"
                label="nom de l'étudiant"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrez un nom valide"
                onInput={inputHandler}
            />


            <Input
                id="courrielEtudiant"
                element="input"
                type="text"
                label="courriel de l'étudiant"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Entrez un courriel valide"
                onInput={inputHandler}
            />

            <Select 
                id="profilEtudiant"
                label="profil de l'étudiant"
                validators={[VALIDATOR_REQUIRE]}
                errorText="Entrez un nom d'entreprise"
                options = {[
                    {value: '', label: "Selectionner un profil de sortie"},
                    {value: "Reseau et sécurité", label: 'Reseau et sécurité'},
                    {value: "Développement d'application", label: "Développement d'application"}
                ]}
                onInput={inputHandler}
            />

           


            <Button type="submit" disabled={!formState.isValid}>
                Ajouter un etudiant
            </Button>



        </form>
        </React.Fragment>
    );
};


export default NewStudent;
