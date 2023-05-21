import React, { useState } from 'react';
import Card from "../../shared/Card"
import Button from '../../shared/FormElements/Button';
import Modal from "../../shared/Modal";
import ErrorModal from "../../shared/ErrorModal"
import { useHttpClient } from '../../shared/hooks/http-hook'
import "./EtudiantItem.css"


const EtudiantItem = props =>{
    const {error, sendRequest, clearError } = useHttpClient();
    const[showConfirmModal, setShowConfirmModal] = useState(false);

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
      };
    
      const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
      };
    const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        try{
            await sendRequest(
                `http://localhost:5000/api/etudiants/${props.id}`,
                'DELETE'
            );
            props.onDelete(props.id);
        }catch(err){}
    };
    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            <Modal
                header= {props.prenom}
                contentClass="etudiant-item__modal-content"
                footerClass="etudiant-item__modal-actions"
                >
                    
            </Modal>
            <Modal
                show={showConfirmModal}
                onCancel={cancelDeleteHandler}
                header="Êtes-vous sûr?"
                footerClass = "etudiant-item__modal-actions"
                footer={
                    <React.Fragment>
                        <Button inverse onClick={cancelDeleteHandler}>
                            Annuler
                        </Button>
                        <Button danger onClick={confirmDeleteHandler}>
                            Supprimer
                        </Button>
                    </React.Fragment>
                }
                >
                    <p>
                        Voulez-vous supprimer cet etudiant? Notez que cela ne pourra pas être changé plus tard
                    </p>
                    </Modal>
                    <li className="etudiant-item">
                        <Card className="etudiant-item__content">
                            <div className="etudiant-item__info">
                                <h2>{props.nom}</h2>
                                <h3>{props.numero}</h3>
                                <h3>{props.courrielEtu}</h3>
                                <h3>{props.profilEtu}</h3>
                            </div>
                            <div className="etudiant-item__actions">
                                <Button to={`/etudiants/${props.id}`}>Edit</Button>
                                <Button danger onClick={showDeleteWarningHandler}>Supprimer</Button>
                            </div>
                        </Card>
                    </li>
        </React.Fragment>
    );

};
export default EtudiantItem;