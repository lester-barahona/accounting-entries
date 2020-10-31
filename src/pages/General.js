import React,{useContext} from 'react'
import { AsientosContext } from './../AsientosContext';

const General = () => {

    const {getFullGeneralList}=useContext(AsientosContext);
    const general=getFullGeneralList();

    return (
        <div className="container mt-4">
              <h2 className="text-center border-bottom border-info pb-3">Balance General</h2>

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
                            general.gList.list.map((item,index)=>(
                                <tr key={index}>
                                <td className="may-title">{item.type}</td>     
                                <td>{item.maxSector==='1'?`₡ ${item.netValue}`:'-'}</td>
                                <td>{item.maxSector==='2'?`₡ ${item.netValue}`:'-'}</td>
                                </tr> 
                            ))
                        }
                        <tr className="">
                        <td className="may-title">Utilidad o Perdida</td>     
                        <td>{general.rList.maxSector==='1'?`₡ ${general.rList.netValue}`:'-'}</td>
                        <td>{general.rList.maxSector==='2'?`₡ ${general.rList.netValue}`:'-'}</td>
                        </tr>
                        <tr className="bg-info text-white">
                        <td className="may-title">Total:</td>     
                        <td>₡ {general.sumDebe}</td>
                        <td>₡ {general.sumHaber}</td>
                        </tr>
                    </tbody>
              </table>
              </div>
        </div>          
    )
}

export default General
