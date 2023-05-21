import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import StageList from "../components/StageList";
import ErrorModal from "../../shared/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import TrierStage from "../components/TrierStages";

const MesStages = () => {
  const [loadedStages, setLoadedStages] = useState();
  const { error, sendRequest, clearError } = useHttpClient();
  const [filteredProfil, setFilteredProfil] = useState('programmation')

  const filterChangeHandler = (selectedProfil) =>{
    setFilteredProfil(selectedProfil)
  }
  



  const staId = useParams().staId;

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/stages/`
        );
        setLoadedStages(responseData.stages);
      } catch (err) {}
    };
    fetchStages();
  }, [sendRequest, staId]);

  const stageDeletedHandler = (deletedStageId) => {
    setLoadedStages((prevStages) =>
      prevStages.filter((stage) => stage.id !== deletedStageId)
    );
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <TrierStage 
        selected = {filteredProfil}
        onChangementFiltre = {filterChangeHandler}  />
      {loadedStages && (
        <StageList items={loadedStages} onDeleteStage={stageDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default MesStages;
