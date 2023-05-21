import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import EtudiantList from "../components/EtudiantList";
import ErrorModal from "../../shared/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const MesEtudiants = () => {
  const [loadedEtudiants, setLoadedEtudiants] = useState();
  const { error, sendRequest, clearError } = useHttpClient();

  const etuId = useParams().etuId;

  useEffect(() => {
    const fetchEtudiants = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/etudiants/`
        );
        setLoadedEtudiants(responseData.etudiants);
      } catch (err) {}
    };
    fetchEtudiants();
  }, [sendRequest, etuId]);

  const etudiantDeletedHandler = (deletedEtudiantId) => {
    setLoadedEtudiants((prevStudents) =>
      prevStudents.filter((etudiant) => etudiant.id !== deletedEtudiantId)
    );
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {loadedEtudiants && (
        <EtudiantList items={loadedEtudiants} onDeleteEtudiant={etudiantDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default MesEtudiants;
