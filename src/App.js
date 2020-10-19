import React from 'react';
import './App.css';
//router dom
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';

// components
import Header from './components/header/Header';
import Asientos from './pages/Asientos';

//context

import  {AsientosProvider} from './AsientosContext';
import Mayorizacion from './pages/Mayorizacion';
import Comprobacion from './pages/Comprobacion';
import Resultados from './pages/Resultados';
import General from './pages/General';

function App() {

  return (
    <>
     <Router>
        <Header />
        <Switch>
          <AsientosProvider>
            <Route path="/" exact render={()=><Asientos/>}/>
            <Route path="/mayorizacion" exact render={()=><Mayorizacion/>}/>
            <Route path="/comprobacion" exact render={()=><Comprobacion/>}/>
            <Route path="/resultados" exact render={()=><Resultados/>}/>
            <Route path="/general" exact render={()=><General/>}/>
          </AsientosProvider>
        </Switch>
    </Router> 
    </>
  );
}

export default App;
