import React,{useContext} from 'react'
import { AsientosContext } from './../AsientosContext';

const Resultados = () => {

    const {getResultadosList}=useContext(AsientosContext);

    const rList=getResultadosList();

    return (
        <div className="container mt-4">
              <h2 className="text-center border-bottom border-info pb-3">Estado de Resultados</h2>

              <div className="container">
              <table className="table table-hover mt-4 table-active text-center">
                    <thead>
                        <tr>
                        <th scope="col">Tipo</th>
                        <th scope="col">Debe</th>
                        <th scope="col">Haber</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rList.list.map((item,index)=>(
                                <tr key={index}>
                                <td className="may-title">{item.type}</td>     
                                <td>{item.maxSector==='1'?`₡ ${item.netValue}`:'-'}</td>
                                <td>{item.maxSector==='2'?`₡ ${item.netValue}`:'-'}</td>
                                </tr> 
                            ))
                        }
                        <tr className="bg-info text-white">
                        <td className="may-title">Utilidad o Perdida:</td>     
                        <td>{rList.maxSector==='1'?`₡ ${rList.netValue}`:'-'}</td>
                        <td>{rList.maxSector==='2'?`₡ ${rList.netValue}`:'-'}</td>
                        </tr>
                    </tbody>  
                </table> 
              </div>
        </div>
    )
}

export default Resultados