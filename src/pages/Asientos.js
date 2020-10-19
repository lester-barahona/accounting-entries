import React from 'react'
import Form from './../components/form/Form';
import AsientosList from './../components/listaasientos/AsientosList';

const Asientos = () => {
    
    return (
        <div className="container mt-4">
            <div className="row d-flex  justify-content-center">
                <div className="col-lg-8 col-md-12">
                    <Form/>
                </div>
                <div className="col-lg-4 col-md-12">
                    <AsientosList/> 
                </div>
            </div>
        </div>
    )
}

export default Asientos
