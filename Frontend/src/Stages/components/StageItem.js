import React, { useState } from 'react';
import Card from "../../shared/Card"
import Button from '../../shared/FormElements/Button';
import Modal from "../../shared/Modal";
import ErrorModal from "../../shared/ErrorModal"
import { useHttpClient } from '../../shared/hooks/http-hook'
import "./StageItem.css"


const StageItem = props =>{
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
                process.env.REACT_APP_BACKEND_URL+`/stages/${props.id}`,
                'DELETE'
            );
            props.onDelete(props.id);
        }catch(err){}
    };
    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            <Modal
                header= {props.contact}
                contentClass="stage-item__modal-content"
                footerClass="stage-item__modal-actions"
                >
                    
            </Modal>
            <Modal
                show={showConfirmModal}
                onCancel={cancelDeleteHandler}
                header="Êtes-vous sûr?"
                footerClass = "stage-item__modal-actions"
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
                        Voulez-vous supprimer ce stage? Notez que cela ne pourra pas être changé plus tard
                    </p>
                    </Modal>
                    <li className="stage-item">
                        <Card className="stage-item__content">
                            <div className="stage-item__info">
                                <h2>{props.entreprise}</h2>
                                <h3>{props.courriel}</h3>
                                <h3>{props.numero}</h3>
                                <h3>{props.adresse}</h3>
                                <h3>{props.type}</h3>
                                <h3>{props.postesDispo}</h3>
                                <h3>{props.description}</h3>
                          
                               
                            </div>
                            <div className="stage-item__actions">
                                <Button to={`/stages/${props.id}`}>Edit</Button>
                                <Button danger onClick={showDeleteWarningHandler}>Supprimer</Button>
                            </div>
                        </Card>
                    </li>
        </React.Fragment>
    );

};
export default StageItem;