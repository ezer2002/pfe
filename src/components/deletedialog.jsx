import React, { useState, useRef } from 'react';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import './Dialog.css'; // Importez votre fichier CSS contenant les styles personnalisés

import { MdDeleteOutline } from 'react-icons/md';

export default function DeclarativeDemo({action}) {
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    const accept = () => {
      action()
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog group="declarative" visible={visible} onHide={() => setVisible(false)} message="Are you sure you want to proceed?" 
                header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
       

            <div className="">
        
            <MdDeleteOutline  onClick={() => setVisible(true)} size={20} cursor={"pointer"} color='red' />
                {/* <button onClick={() => setVisible(true)} icon="pi pi-check" label="Confirm"  class={color} >{name} </button> */}
            </div>
     
        </>
    )
}
