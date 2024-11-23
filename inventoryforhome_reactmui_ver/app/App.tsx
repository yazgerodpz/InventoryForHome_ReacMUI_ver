import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';  // Importar las herramientas de enrutamiento
import ButtonAppBar from './Components/AppBar';  // Asegúrate de importar tu componente de AppBar
import Inicio from './page';  // Página de Inicio
import Inventario from './Inventario';  // Página de Inventario
import ReglasPrioridad from './Prioridad';  // Página de Regla de Prioridad
import Empaques from './Empaques';  // Página de Empaques

const App: React.FC = () => {
    return (
      <Router>
        <ButtonAppBar />  {/* Agregar el AppBar aquí */}
        <Switch>
          <Route exact path="/" component={Inicio} />
          <Route path="/inventario" component={Inventario} />
          <Route path="/reglas-prioridad" component={ReglasPrioridad} />
          <Route path="/empaques" component={Empaques} />
        </Switch>
      </Router>
    );
  }

export default App;