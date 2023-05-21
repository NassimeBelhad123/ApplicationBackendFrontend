import React from 'react';

import Card from "../../shared/Card.js"
import EtudiantItem from './EtudiantItem.js';
import Button from '../../shared/FormElements/Button.js';
import "./EtudiantList.css"

const EtudiantList = props =>{
    if(props.items.length === 0){
        return(
            <div className = "etudiant-list center">
                <Card>
                    <h2>Aucun étudiant trouvé</h2>
                    <Button to="/NouvelEtudiant">Créer etudiant</Button>
                </Card>
            </div>
        );
    }


    return(
        <ul className="etudiant-list">
            {props.items.map(etudiant =>(
                <EtudiantItem
                key={etudiant.id}
                id={etudiant.id}
                numero={etudiant.numero}
                nom={etudiant.nom}
                courrielEtu={etudiant.courrielEtu}
                profilEtu={etudiant.profilEtu}
                onDelete = {props.onDeleteEtudiant}
                />
            ))}
        </ul>
    );
};

export default EtudiantList;
