import React,{useContext} from 'react'
import { AsientosContext } from './../AsientosContext';

const Mayorizacion = () => {

    const {getMayorizacionList}=useContext(AsientosContext);


    return (
        <div className="container mt-4">
            <h2 className="text-center border-bottom border-info pb-3">Mayorización
                <span className="text-info-row bg-info text-white float-right ml-4 p-2">Util</span>
                <span className="text-info-row bg-dark text-white float-right p-2">Totales</span>
            </h2>
            <div className="row w-100 d-flex flex-wrap justify-content-start">
                {
                    getMayorizacionList().map((may,index)=>(
                        <div className="m-4 may-card" key={index}>
                            <h4 className="card-title text-center may-title">{may.type}</h4>
                            <table className="table table-hover mt-4 table-active text-center">
                                        <thead>
                                            <tr>
                                            <th scope="col">Debe</th>
                                            <th scope="col">Haber</th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {
                                                may.inputs.reverse().map(input=>(
                                                    <tr key={input.id}> 
                                                        <td>{input.sector==='1'?`₡ ${input.amount}`:'-'}</td>
                                                        <td>{input.sector==='2'?`₡ ${input.amount}`:'-'}</td>
                                                    </tr>
                                                    )
                                                )
                                            }
                                            <tr className="bg-dark text-white"> 
                                                <td>₡{may.sumDebe}</td>
                                                <td>₡{may.sumHaber}</td>
                                            </tr>
                                            
                                            <tr className="bg-info text-white"> 
                                                <td>{may.maxSector==='1'?`₡ ${may.netValue}`:null}</td>
                                                <td>{may.maxSector==='2'?`₡ ${may.netValue}`:null}</td>
                                            </tr>
                                        </tbody>
                                </table>        
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default Mayorizacion
