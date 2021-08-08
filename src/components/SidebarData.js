import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as WiIcons from 'react-icons/wi';


export const SidebarData = [
  {
    title: 'Home',
    path: '/Home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Temperatura',
    path: '/Sensor1',
    icon: <FaIcons.FaTemperatureHigh />,
    cName: 'nav-text'
  },
  {
    title: 'Humedad',
    path: '/Sensor2',
    icon: <WiIcons.WiHumidity />,
    cName: 'nav-text'
  },
  {
    title: 'Graficas',
    path: '/Graficas',
    icon: <BsIcons.BsGraphUp />,
    cName: 'nav-text'
  },
];
