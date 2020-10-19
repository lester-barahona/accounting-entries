import React,{useState,createContext} from 'react';

export const AsientosContext =createContext();

export const AsientosProvider = (props) => {
    
    const [types]=useState(['activo','pasivo','patrimonio','gastos','ingresos']);
   
    const [asientos, setAsientos] = useState([
        {
            id:'asiento1',
            date:'2020-10-17',
            description:'Inversion Inicial',
            inputs:[
                {
                    id:'a1input1',
                    type:'activo',
                    sector:'1',
                    amount:8000000
                },
                {
                    id:'a1input2',
                    type:'patrimonio',
                    sector:'2',
                    amount:8000000
                },
            ]
        },
        {
            id:'asiento2',
            date:'2020-10-17',
            description:'Compra Maquina',
            inputs:[
                {
                    id:'a2input1',
                    type:'activo',
                    sector:'1',
                    amount:800000
                },
                {
                    id:'a2input2',
                    type:'activo',
                    sector:'2',
                    amount:400000
                },
                {
                    id:'a2input3',
                    type:'pasivo',
                    sector:'2',
                    amount:400000
                }
            ]
        },
        {
            id:'asiento3',
            date:'2020-10-17',
            description:'Ventas',
            inputs:[
                {
                    id:'a3input1',
                    type:'activo',
                    sector:'1',
                    amount:5000000
                },
                {
                    id:'a3input2',
                    type:'ingresos',
                    sector:'2',
                    amount:5000000
                }
            ]
        },
        {
            id:'asiento4',
            date:'2020-10-17',
            description:'Servicio Basicos',
            inputs:[
                {
                    id:'a4input1',
                    type:'activo',
                    sector:'2',
                    amount:58000
                },
                {
                    id:'a4input2',
                    type:'gastos',
                    sector:'1',
                    amount:58000
                }
            ]
        },
        
    ]);

    const addAsiento=(asiento)=>{
        setAsientos([
            ...asientos,
            asiento
        ]);
    }

    const deleteAsiento=(id)=>{
        let newAsientos=asientos.filter(asiento=>asiento.id!==id);
        setAsientos(newAsientos);
    }


    const filterInputsByType=(type)=>{
        let filteredList={
            type:'',
            inputs:[],
            sumDebe:0,
            sumHaber:0,
            maxSector:'',
            netValue:0
        };
        asientos.forEach(asiento => {
            asiento.inputs.forEach(input=>{
                if(input.type===type){
                    filteredList.inputs.push(input);
                }
            });
        });
        return filteredList;
    }

    const sumaSector=(fList,sector)=>{
        return fList.reduce((acc,crr)=>{
            if(crr.sector===sector){
                 acc+=parseInt(crr.amount);
            }
            return acc;
        },0);
    }

    const getMayorizacionByType=(type)=>{
        let filterList=filterInputsByType(type);
        filterList.type=type;
        filterList.sumDebe=sumaSector(filterList.inputs,'1');
        filterList.sumHaber=sumaSector(filterList.inputs,'2');
        filterList.maxSector=filterList.sumDebe>filterList.sumHaber?'1':'2';
        filterList.netValue=filterList.sumDebe>filterList.sumHaber?filterList.sumDebe-filterList.sumHaber:filterList.sumHaber-filterList.sumDebe;
        return filterList;
    }

    const getMayorizacionList=()=>{
        let mayList=[];
        types.forEach(typ=>{
            let may=getMayorizacionByType(typ);
             if(may.inputs.length>0){
                mayList.push(may);
             }
        });
        return mayList;
    }

    //comprobacion functions

    const sumaComprobacion=(cList,sector)=>{
        return cList.list.reduce((acc,crr)=>{
            if(crr.maxSector===sector){
                 acc+=parseInt(crr.netValue);
            }
            return acc;
        },0);
    }

    const getComprobacionList=()=>{
        let comprobacion={
            list:getMayorizacionList(),
            sumDebe:0,
            sumHaber:0
        }
        comprobacion.sumDebe=sumaComprobacion(comprobacion,'1');
        comprobacion.sumHaber=sumaComprobacion(comprobacion,'2');
        return comprobacion;
    }
    //--------------------------------------------------resultados
    const getResultadosList=()=>{
        let rList={
            list:[
                getMayorizacionByType('ingresos'),
                getMayorizacionByType('gastos')
            ],
            maxSector:'',
            netValue:0
        }

     rList.maxSector=rList.list[0].netValue>rList.list[1].netValue?'2':'1';
     rList.netValue=rList.list[0].netValue>rList.list[1].netValue?rList.list[0].netValue-rList.list[1].netValue:rList.list[1].netValue-rList.list[0].netValue;
        
     return rList;
     
    }

    //----------------------------------------------general
    const getGeneralListFilter=()=>{
        let gList=[];
        let typeL=['activo','patrimonio','pasivo']
        typeL.forEach(typ=>{
            let may=getMayorizacionByType(typ);
             if(may.inputs.length>0){
                gList.push(may);
             }
        });
        return gList;
    }

    const getGeneralList=()=>{
        let general={
            list:getGeneralListFilter(),
            sumDebe:0,
            sumHaber:0
        }
        general.sumDebe=sumaComprobacion(general,'1');
        general.sumHaber=sumaComprobacion(general,'2');
        return general;
    }

    const getFullGeneralList=()=>{
        let general={
            gList:getGeneralList(),
            rList:getResultadosList(),
            sumDebe:0,
            sumHaber:0
        }
        general.sumDebe=general.gList.sumDebe+(general.rList.maxSector==='1'?general.rList.netValue:0);
        general.sumHaber=general.gList.sumHaber+(general.rList.maxSector==='2'?general.rList.netValue:0);
        return general;
    }


    return ( 
        <AsientosContext.Provider value={{asientos,types,addAsiento,deleteAsiento,getMayorizacionList,getComprobacionList,getResultadosList,getFullGeneralList}}>
            {props.children}
        </AsientosContext.Provider>
    );
}
 
