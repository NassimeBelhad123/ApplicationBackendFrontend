import React from 'react';

import Card from "../../shared/Card.js"
import StageItem from './StageItem.js';
import Button from '../../shared/FormElements/Button.js';
import "./StageList.css"

const StageList = props =>{
    if(props.items.length === 0){
        return(
            <div className = "stage-list center">
                <Card>
                    <h2>Aucun stage trouvé</h2>
                    <Button to="/NouveauStage">Créer stage</Button>
                </Card>
            </div>
        );
    }


    return(
        <ul className="stage-list">
            {props.items.map(stage =>(
                <StageItem
                key={stage.id}
                id={stage.id}
                contact={stage.contact}
                courriel={stage.courriel}
                numero={stage.numero}
                entreprise={stage.entreprise}
                adresse={stage.adresse}
                type={stage.type}
                postesDispo={stage.postesDispo}
                description={stage.description}
                remuneration={stage.remuneration}
                onDelete = {props.onDeleteStage}
                />
            ))}
        </ul>
    );
};

export default StageList;
