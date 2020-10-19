import React,{useState,useContext} from 'react'
import { v4 as uuidv4 } from 'uuid';
import { AsientosContext } from './../../AsientosContext';

const Form = () => {
    
    const {addAsiento,types}=useContext(AsientosContext);

    const getDate=(date)=>{
        let today = [date.getFullYear(),(date.getMonth()+1),date.getDate()];
        if(today[2]<10) 
            today[2]='0'+today[2];
        
        if(today[1]<10) 
            today[1]='0'+today[1];
        return today[0]+'-'+today[1]+'-'+today[2];
    }
    

    const [asiento,setAsiento]=useState({
        id:'',
        date:getDate(new Date()),
        description:'',
        inputs:[]
    });

    const [input,setInput]=useState({
        id:'',
        type:'',
        sector:'',
        amount:0
    });

    //clear states
    const clearInput=()=>setInput(
        {
            id:'',
            type:'',
            sector:'',
            amount:0
        }
    );
    const clearAsiento=()=>setAsiento({id:'',date:getDate(new Date()),description:'',inputs:[]});
   

    //Updating change function
    const updateState=(e)=>setAsiento({...asiento,[e.target.name]: e.target.value});
    const updateStateInput=(e)=>{setInput({...input,[e.target.name]: e.target.value})};
    
    //destructuring
    const {date,description}=asiento;
    const {type,amount,sector}=input;

    const addInput=()=>{
        if(type.trim()!=='' && amount>0 && sector!==0){
        input.id=uuidv4();
        setAsiento({...asiento,inputs:[...asiento.inputs,input]});
        clearInput();
        }
    }

    const addingAsiento=()=>{
        if(description.trim()!=='' && asiento.inputs.length>0){
        asiento.id=uuidv4();
        addAsiento(asiento);
        clearAsiento();
        }
    }

    return (
        <>
        <div className="row">
            <div className="col-lg-6 col-md-12">
                    <p className="h4 mb-3 text-center border-bottom border-info pb-4">NUEVO ASIENTO</p>
                    <div className="form-group">
                        <label htmlFor="fecha">Fecha:</label>
                        <input type="date" name="date" className="form-control" value={date} onChange={updateState}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="fecha">Descripción:</label>
                        <textarea name="description" className="form-control" value={description} onChange={updateState} required/>
                    </div>

                <hr/>

                <div className="p-3 input-container mt-4">
                    <div className="form-row ">
                        <div className="col-lg-5 col-md-12">
                        <label htmlFor="fecha" className="text-white">Tipo:</label>
                            <select className="custom-select" name="type" value={type} onChange={updateStateInput} required >
                                <option value="" disabled>Seleciona</option>
                                {
                                    types.map((typ,index)=>(
                                            <option key={index} value={typ} className="option-cap">{typ}</option>
                                        )
                                    )
                                }
                            </select>
                        </div>

                        <div className="col-lg-7 col-md-12">
                            <div className="form-group">
                                <label className="control-label text-white">Monto</label>
                                <div className="form-group">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">₡</span>
                                    </div>
                                    <input type="number" className="form-control text-center" min="0" name="amount" value={amount} onChange={updateStateInput} required/>
                                    <div className="input-group-append">
                                        <span className="input-group-text">.00</span>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <div className="form-row mt-3 px-4">
                        <div className="col-lg-8 col-md-12">
                            <div className="form-group d-flex justify-content-around">
                            <div className="custom-control custom-radio">
                                <input type="radio" id="customRadio2" name="sector" value="1" className="custom-control-input" checked={sector==='1'} onChange={updateStateInput}/>
                                <label className="custom-control-label text-white" htmlFor="customRadio2">Debe</label>
                            </div>
                            <div className="custom-control custom-radio ml-3">
                                <input type="radio" id="customRadio3" name="sector" value="2"  className="custom-control-input"  checked={sector==='2'} onChange={updateStateInput}/>
                                <label className="custom-control-label text-white" htmlFor="customRadio3">Haber</label>
                            </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                        <button className="btn btn-outline-info btn-block" type="button" onClick={addInput}>Añadir</button>
                        </div>
                    </div>
                
                </div>
               
            </div>
           
            <div className="col-lg-6 col-md-12">
                <div className="card border-info mb-3 mt-5" >
                    <div className="card-header"> 
                        <span className="d-inline-block mt-2">Fecha: {date}</span>
                        <button className="btn btn-outline-success float-right" type="button" onClick={addingAsiento}>Guardar Asiento</button>
                    </div>
                    
                    <div className="card-body">
                        <h4 className="card-title">{description? description:'Sin descipción'}</h4>
                        <table className="table table-hover mt-4 table-active">
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
            </div>
        </div> 
        </>

    )
}

export default Form
