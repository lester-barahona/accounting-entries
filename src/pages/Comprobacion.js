import React,{useContext} from 'react'
import { AsientosContext } from './../AsientosContext';

const Comprobacion = () => {
    
    const {getComprobacionList}=useContext(AsientosContext);
    const cList=getComprobacionList();

    return (
        <div className="container mt-4">
            <h2 className="text-center border-bottom border-info pb-3">Balanza de Comprobación</h2>
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
                        cList.list.map((item,index)=>(
                            <tr key={index}>
                                <td className="may-title">{item.type}</td>     
                                <td>{item.maxSector==='1'?`₡ ${item.netValue}`:'-'}</td>
                                <td>{item.maxSector==='2'?`₡ ${item.netValue}`:'-'}</td>
                            </tr>
                        )
                        )
                    }
                    <tr className="bg-info text-white">
                        <td className="may-title">Total:</td>     
                        <td>₡ {cList.sumDebe}</td>
                        <td>₡ {cList.sumHaber}</td>
                    </tr>
                </tbody>
            </table>                            

            </div>
        </div>
    )
}

export default Comprobacion
