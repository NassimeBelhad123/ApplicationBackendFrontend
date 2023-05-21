import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import Input from '../../shared/FormElements/Input';
import Button from '../../shared/FormElements/Button';
import {VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH, VALIDATOR_EMAIL} from '../../shared/util/validators';
import ErrorModal from "../../shared/ErrorModal"
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Select from '../Select';

const NewStage = () =>{
    const { error, sendRequest, clearError } = useHttpClient();
    const[formState, inputHandler] = useForm(
        {
            nomContact:{
                value:'',
                isValid: false
            },

            courrielContact:{
                value:'',
                isValid: false
            },

            numeroTelephoneContact:{
                value:'',
                isValid: false
            },

            nomEntreprise:{
                value:'',
                isValid: false
            },

            adresseEntreprise:{
                value:'',
                isValid: false
            },

            typeStage:{
                value:'',
                isValid: false
            },

            nbPostesDispo:{
                value:'',
                isValid: false
            },

            description:{
                value:'',
                isValid: false
            },

            remuneration:{
                value:'',
                isValid: false
            },

        },
        false
    );




    const history = useHistory();

    const stageSubmitHandler  = async event =>  {
        event.preventDefault();
        console.log(formState.inputs); // send this to the backend!
    
        try {
          const reponseData = await sendRequest(
            "http://localhost:5000/api/stages/",
            "POST",
            JSON.stringify({
                contact: formState.inputs.nomContact.value,
                courriel: formState.inputs.courrielContact.value,
                numero: formState.inputs.numeroTelephoneContact.value,
                entreprise:formState.inputs.nomEntreprise.value,
                adresse: formState.inputs.adresseEntreprise.value,
                type: formState.inputs.typeStage.value,
                postesDispo: formState.inputs.nbPostesDispo.value,
                description: formState.inputs.description.value,
                remuneration: formState.inputs.remuneration.value


            }),
            {
              "Content-Type": "application/json",
            }
          );
    
          console.log(reponseData);
          history.push("/ListeStages");
        } catch (err) {
          console.log(err);
        }
      };


    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
        <form className="place-form" onSubmit={stageSubmitHandler}>
            <Input
                id="nomContact"
                element="input"
                type="text"
                label="Nom du contact"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrez un nom valide"
                onInput={inputHandler}
            />

            <Input
                id="courrielContact"
                element="input"
                type="text"
                label="courriel du contact"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Entrez un courriel valide"
                onInput={inputHandler}
            />


            <Input
                id="numeroTelephoneContact"
                element="input"
                type="number"
                label="numero de telephone"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrez un numero de telephone"
                onInput={inputHandler}
            />

            <Input 
                id="nomEntreprise"
                element="input"
                type="text"
                label="nom de l'entreprise"
                validators={[VALIDATOR_REQUIRE]}
                errorText="Entrez un nom d'entreprise"
                onInput={inputHandler}
            />

            <Input
                id="adresseEntreprise"
                element="input"
                type="text"
                label="Adresse de l'entreprise"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrez une adresse valide."
                onInput={inputHandler}
             />



            <Select
                id="typeStage"
                label="Type de stage"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Sélectionnez un type de stage."
                options={[
                    { value: '', label: 'Sélectionnez un type de stage' },
                    { value: 'reseau', label: 'Réseaux et sécurité' },
                    { value: 'application', label: "Développement d'application"  }
                ]}
                onInput={inputHandler}
            />


            <Input 
                id="nbPostesDispo"
                element="input"
                type="number"
                label="nombre de postes"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Mettez un nombre de postes"
                onInput={inputHandler}
            />


            <Input
                id="description"
                element="textarea"
                label="Description du stage"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Entrez une description valide (au moins 5 caractères)"
                onInput={inputHandler}
            />

            <Input
                id="remuneration"
                element="input"
                label="Rémunération"
                validators={[VALIDATOR_REQUIRE]}
                errorText="Entrez une rémunération ou 'Aucun' "
                onInput={inputHandler}
            />


            <Button type="submit" disabled={!formState.isValid}>
                Créer le stage
            </Button>



        </form>
        </React.Fragment>
    );
};


export default NewStage;
