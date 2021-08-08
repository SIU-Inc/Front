import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import './App.scss'
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Sensor1 from './pages/Sensor1'
import Sensor2 from './pages/Sensor2'
import Graficas from './pages/Graficas'

function App() {

  return (
    
    <Router>
      <Navbar />
      <div className="flex">
        <div className="content">
          <Route path="/Home" exact={true} component={Home} />
          <Route path="/Sensor1" exact={true} component={Sensor1} /> 
          <Route path="/Sensor2" exact={true} component={Sensor2} />
          <Route path="/Graficas" exact={true} component={Graficas} />  
        </div>
      </div> 
    </Router>
  );
}

export default App;
