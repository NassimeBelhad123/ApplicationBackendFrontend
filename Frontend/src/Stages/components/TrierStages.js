import React from "react"

import "./TrierStage.css"


const FiltreStages = (props) =>{
    const menuDeroulantHandler = (event) =>{
        props.onChangementFiltre(event.target.value);
    };




    return(
        <div className = 'classes-filter'>
            <div className = 'classes-filter__control'>
                <label>Filtrer les stages par profil</label>
                <select value = {props.selected} onChange={menuDeroulantHandler}>
                    <option value = "reseau">Sécurité et Réseaux</option>
                    <option value = "programmation">Développement d'application</option>
                </select>
            </div>
        </div>
    );
    
};

export default FiltreStages;