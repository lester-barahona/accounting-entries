import React,{useContext} from 'react'
import { AsientosContext } from './../../AsientosContext';

const AsientosList = () => {

    const {asientos,deleteAsiento}=useContext(AsientosContext);

    return (
        <div className="asientos-list-container mt-5 w-100 overflow-auto px-3">
                {
                    asientos.reverse().map(asiento=>(
                        <div key={asiento.id} className="card text-white bg-success mb-3">
                            <div className="card-header">
                                <span className="d-inline-block mt-1">Fecha: {asiento.date}</span>
                                <button className="btn btn-sm btn-outline-danger float-right" type="button" onClick={()=>deleteAsiento(asiento.id)}>Eliminar</button>
                            </div>
                            <div className="card-body pt-2 pb-0">
                                <h5 className="card-title">{asiento.description?asiento.description:'Sin descripción'}</h5>
                                <table className="table table-hover table-success table-small">
                                    <thead>
                                        <tr>
                                        <th scope="col">Cuenta</th>
                                        <th scope="col">Debe</th>
                                        <th scope="col">Haber</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        {
                                            asiento.inputs.map(input=>(
                                                <tr key={input.id}> 
                                                    <td>{input.type.toUpperCase()}</td>
                                                    <td>{input.sector==='1'?`₡ ${input.amount}`:'-'}</td>
                                                    <td>{input.sector==='2'?`₡ ${input.amount}`:'-'}</td>
                                                </tr>
                                                )
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    
                    )
                    )
                }
           
        </div>
    )
}

export default AsientosList
