import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Temperatura from './pages/Temperatura';
import Home from './pages/Home';
import Humedad from './pages/Humedad';
import './assets/styles/tailwind.css';

function App() {

  return (
    <>
    <Sidebar />
    <div className="md:ml-64">
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/temperatura" component={Temperatura} />
            <Route exact path="/humedad" component={Humedad} />
            <Redirect from="*" to="/" />
        </Switch>
    </div>
    </>
  );
}

export default App;
