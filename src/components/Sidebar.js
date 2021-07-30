import { NavLink } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import { Container } from 'react-bootstrap'

const Sidebar = () =>{
    return(
        <div className="sidebar bg-light">
            <ul>
                <li>
                    <NavLink to="/Home" className="btn btn-secundary" activeClassName="active"> 
                    <FaIcons.FaHome className="me-3"/>Inicio</NavLink>
                </li>
                <li>
                    <NavLink to="/Sensor1" className="btn btn-secundary" activeClassName="active">
                    <FaIcons.FaTemperatureHigh className="me-3"/>Temperatura</NavLink>
                </li>
                <li>
                    <NavLink to="Sensor2" className="btn btn-secundary" activeClassName="active">
                    <FaIcons.FaTemperatureLow className="me-3"/>Humedad</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;