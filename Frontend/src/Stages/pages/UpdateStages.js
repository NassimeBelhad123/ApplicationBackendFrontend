import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/FormElements/Input';
import Button from '../../shared/FormElements/Button';
import Card from '../../shared/Card';
import ErrorModal from '../../shared/ErrorModal';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Select from '../Select';

import './NouveauStage.css';

const UpdateStage = () => {
 
  const {error, sendRequest, clearError } = useHttpClient();
  const [loadedStage, setLoadedStage] = useState();
  const stageId = useParams().stageId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
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

  useEffect(() => {
    const fetchStage = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL+`/stages/${stageId}`
        );
        setLoadedStage(responseData.stage);
        console.log(responseData.stage)
        setFormData(
          {
            nomContact: {
              value: responseData.stage.contact,
              isValid: true
            },
            courrielContact: {
              value: responseData.stage.courriel,
              isValid: true
            },
            numeroTelephoneContact: {
                value: responseData.stage.numero,
                isValid: true
              },
              nomEntreprise: {
                value: responseData.stage.entreprise,
                isValid: true
              },
              adresseEntreprise: {
                value: responseData.stage.adresse,
                isValid: true
              },
              typeStage: {
                value: responseData.stage.type,
                isValid: true
              },
              nbPostesDispo: {
                  value: responseData.stage.postesDispo,
                  isValid: true
                },
                description: {
                  value: responseData.stage.remuneration,
                  isValid: true
                },

              remuneration:{
                  value: responseData.stage.remuneration,
                  isValid: true
              }
            
            
            
          },
          true
        );

      } catch (err) {}
    };
    fetchStage();
  }, [sendRequest, stageId, setFormData]);

  const stageUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL+`/stages/${stageId}`,
        'PATCH',
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
          'Content-Type': 'application/json'
        }
      );
      history.push('/ListeStages');
    } catch (err) {}
  };



  if (!loadedStage && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Impossible de trouver le stage!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {loadedStage && (
        <form className="place-form" onSubmit={stageUpdateSubmitHandler}>
          <Input
            id="nomContact"
            element="input"
            type="text"
            label="Nom du contact"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Entrez un nom valide"
            onInput={inputHandler}
            initialValue={loadedStage.contact}
            initialValid={true}
          />
          <Input
            id="courrielContact"
            element="input"
            type="text"
            label="courriel du contact"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Entrez un courriel."
            onInput={inputHandler}
            initialValue={loadedStage.courriel}
            initialValid={true}
          />

          <Input 
                id="numeroTelephoneContact"
                element="input"
                type="number"
                label="numero de telephone"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrez un numero de telephone"
                onInput={inputHandler}
                initialValue={loadedStage.numero}
                initialValid={true}
            />

            <Input 
                id="nomEntreprise"
                element="input"
                type="text"
                label="nom de l'entreprise"
                validators={[VALIDATOR_REQUIRE]}
                errorText="Entrez un nom d'entreprise"
                onInput={inputHandler}
                initialValue={loadedStage.entreprise}
                initialValid={true}
            />

            <Input 
                id="adresseEntreprise"
                element="input"
                type="text"
                label="Adresse de l'entreprise"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrez une adresse valide."
                onInput={inputHandler}
                initialValue={loadedStage.adresse}
                initialValid={true}
            />

            <Select 
                id="typeStage"
                label="Type de stage"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Sélectionnez un type de stage."
                options={[
                    { value: '', label: 'Sélectionnez un type de stage' },
                    { value: 'Réseaux et sécurité', label: 'Réseaux et sécurité' },
                    { value: "Développement d'application", label: "Développement d'application"  }
                ]}
                onInput={inputHandler}
                initialValue={loadedStage.type}
                initialValid={true}
            />

            <Input 
                id="nbPostes"
                element="input"
                type="number"
                label="nombre de postes"
                validators={[VALIDATOR_REQUIRE]}
                errorText="Choisissez un nombre de postes"
                onInput={inputHandler}
                initialValue={loadedStage.postesDispo}
                initialValid={true}
            />

            <Input 
                id="description"
                element="input"
                type="text"
                label="Description du stage"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Veuillez entrez au moins 5 caractères"
                onInput={inputHandler}
                initialValue={loadedStage.description}
                initialValid={true}
            />

            <Input 
                id="remuneration"
                element="input"
                type="text"
                label="Remuneration du stage"
                validators={[VALIDATOR_REQUIRE]}
                errorText="Choisissez une remuneration"
                onInput={inputHandler}
                initialValue={loadedStage.remuneration}
                initialValid={true}
            />

          <Button type="submit" disabled={!formState.isValid} >
            Mettre le stage à jour
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateStage;
