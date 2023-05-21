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

import './NouvelEtudiant.css';

const UpdateEtudiant = () => {
 
  const {error, sendRequest, clearError } = useHttpClient();
  const [loadedEtudiant, setLoadedEtudiant] = useState();
  const etudiantId = useParams().etudiantId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
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

  useEffect(() => {
    const fetchEtudiant = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/etudiants/${etudiantId}`
        );
        setLoadedEtudiant(responseData.etudiant);
        console.log(responseData.etudiant)
        setFormData(
          {
            numeroDA: {
              value: responseData.etudiant.numero,
              isValid: true
            },
            nomEtudiant: {
              value: responseData.etudiant.nom,
              isValid: true
            },
            courrielEtudiant: {
                value: responseData.etudiant.courrielEtu,
                isValid: true
              },
              profilEtudiant: {
                value: responseData.etudiant.profilEtu,
                isValid: true
              },
            
            
          },
          true
        );

      } catch (err) {}
    };
    fetchEtudiant();
  }, [sendRequest, etudiantId, setFormData]);

  const etudiantUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/etudiants/${etudiantId}`,
        'PATCH',
        JSON.stringify({
          numero: formState.inputs.numeroDA.value,
          nom: formState.inputs.nomEtudiant.value,
          courrielEtu: formState.inputs.courrielEtudiant.value,
          profilEtu: formState.inputs.profilEtudiant.value
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      history.push('/ListeEtudiants');
    } catch (err) {}
  };



  if (!loadedEtudiant && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Impossible de trouver l'étudiant!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {loadedEtudiant && (
        <form className="place-form" onSubmit={etudiantUpdateSubmitHandler}>
          <Input
            id="numeroDA"
            element="input"
            type="number"
            label="Numero de l'étudiant"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Entrez un numero valide"
            onInput={inputHandler}
            initialValue={loadedEtudiant.numero}
            initialValid={true}
          />
          <Input
            id="nomEtudiant"
            element="input"
            type="text"
            label="nom de l'étudiant"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Entrez un nom valide."
            onInput={inputHandler}
            initialValue={loadedEtudiant.nom}
            initialValid={true}
          />

          <Input id="courrielEtudiant"
                 element = "input"
                 type="text"
                 label = "courriel de l'étudiant"
                 validators={[VALIDATOR_EMAIL()]}
                 errorText="Entrez un email valide"
                 onInput={inputHandler}
                 initialValue={loadedEtudiant.courrielEtu}
                 initialValid={true}
            />

            <Input 
                id="profilEtudiant"
                element="input"
                type="text"
                label="profil de l'étudiant"
                validators={[VALIDATOR_REQUIRE]}
                errorText="Choisissez un profil"
                onInput={inputHandler}
                initialValue={loadedEtudiant.profilEtu}
                initialValid={true}
            />

          <Button type="submit" disabled={!formState.isValid} >
            Mettre l'étudiant à jour
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateEtudiant;
