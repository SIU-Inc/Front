import React, { useState } from "react";
import "../App.css";
import { IoIosMenu } from "react-icons/io";

function Navbar(){
    const [showLinks, setShowLinks] = useState(false);
    return (
    <div className="Navbar">
        <div className="leftSide">
            <div className="linkls" id={showLinks ? 'hidden' : ""}>
                <a href="/">Home</a>
                <a href="/Sensor1">Temperatura</a>
                <a href="/Sensor2">Humedad</a>
                <a href="/Graficas">Graficas</a>
            </div>
            <button onClick={() => setShowLinks(!showLinks)}>
                <IoIosMenu />
            </button>
        </div>
        <div className="rightSide"></div>
    </div>
    )
}
 export default Navbar;