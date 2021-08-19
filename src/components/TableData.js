import React, { useState, useEffect } from "react";
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Tab from "@material-tailwind/react/Tab";
import TabList from "@material-tailwind/react/TabList";
import TabItem from "@material-tailwind/react/TabItem";
import TabContent from "@material-tailwind/react/TabContent";
import TabPane from "@material-tailwind/react/TabPane";
import Icon from "@material-tailwind/react/Icon";
import MapRomero from '../components/MapRomero';
import MapICAS from '../components/MapICAS';
import MapCortina from '../components/MapCortina';
import MapPoli from '../components/MapPoli';
import { ExportCSV } from "../ExportCSV";
import {
    Legend,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Bar,
    BarChart,
  } from "recharts";


export default function CardTable() {

    const [openTab, setOpenTab] = useState(1);
    const [temps, setTemps] = useState([]);
    const [icas, setIcas] = useState([]);
    const [romero, setRomero] = useState([]);
    const [labs, setLabs] = useState([]);
    const [poli, setPoli] = useState([]);
    const [live, setLive] = useState([]);
    const [loading, setLoading] = useState(false);


    const mapReceivedData = (temps) => {
        const transformed = temps.map((element) => {
        const date = new Date(element?.time);
        const hour = new Date(element?.createdAt);
        return { ...element, time: date.toLocaleTimeString(),createdAt: hour.toLocaleDateString() };
        });
        return transformed;
    };
    useEffect(() => {
        setLoading(true);
        const getTemps = async () => {
        try {
            const tempResponse = await fetch(
            "https://api-ttn.herokuapp.com/api/temperature"
            );
            const response = await tempResponse.json();
            setTemps(mapReceivedData(response?.allData));
            const icasTemps = [];
            const romeroTemps = [];
            const labsTemps = [];
            const poliTemps = [];
            const liveTemps = [];
            response?.allData?.forEach((temp, index) => {
            if (temp.id > 200 && temp.id < 221) {
                labsTemps.push(temp);
            }
            if (temp.id > 301 && temp.id < 322) {
                romeroTemps.push(temp);
            }
            if (temp.id > 345 && temp.id < 366) {
                poliTemps.push(temp);
            }
            if (temp.id > 397 && temp.id < 415) {
                icasTemps.push(temp);
            }
            if (temp.id > 971){
                liveTemps.push(temp);
            }
            });
            setLabs(mapReceivedData(labsTemps));
            setRomero(mapReceivedData(romeroTemps));
            setPoli(mapReceivedData(poliTemps));
            setIcas(mapReceivedData(icasTemps));
            setLive(mapReceivedData(liveTemps));
        } catch (error) {}
        setLoading(false);
        };
        getTemps();
    }, []);

    return (
        <Tab className="sticky">
            <TabList color="purple" className="overflow-x-auto scrolling-touch">
                <TabItem
                    onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(1);
                    }}
                    ripple="light"
                    active={openTab === 1 ? true : false}
                    href="tabItem"
                >
                    <Icon name="room" size="lg" />
                    Centro Monseñor Romero
                </TabItem>
                <TabItem
                    onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(2);
                    }}
                    ripple="light"
                    active={openTab === 2 ? true : false}
                    href="tabItem"
                >
                    <Icon name="room" size="lg" />
                    ICAS
                </TabItem>
                <TabItem
                    onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(3);
                    }}
                    ripple="light"
                    active={openTab === 3 ? true : false}
                    href="tabItem"
                >
                    <Icon name="room" size="lg" />
                    Edificio Jon Cortina
                </TabItem>
                <TabItem
                    onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(4);
                    }}
                    ripple="light"
                    active={openTab === 4 ? true : false}
                    href="tabItem"
                >
                    <Icon name="room" size="lg" />
                    Polideportivo
                </TabItem>
                <TabItem
                    onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(5);
                    }}
                    ripple="light"
                    active={openTab === 5 ? true : false}
                    href="tabItem"
                >
                    <Icon name="room" size="lg" />
                    En vivo
                </TabItem>
            </TabList>
            <TabContent>
                <TabPane active={openTab === 1 ? true : false}>
                    <Card>
                        <br />
                        <CardHeader color="purple" contentPosition="left">
                            <h2 className="text-lg">Centro Monseñor Romero</h2>
                        </CardHeader>
                        <CardBody>
                            <div className="overflow-x-auto">
                                <table className="items-center w-full bg-transparent border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            <Icon name="whatshot" fontSize="small" />
                                            Temperatura
                                            </th>
                                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            <Icon name="event" fontSize="small" />
                                            Hora
                                            </th>
                                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            <Icon name="timeline" fontSize="small" />
                                            Frecuencia
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {romero?.map((romeroTemps) => (
                                            <tr key={romeroTemps.id}>
                                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    {romeroTemps.temperature} °C
                                                </td>
                                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    {romeroTemps.time} {romeroTemps.createdAt}
                                                </td>
                                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    {romeroTemps.frequency}
                                                </td>
                                            </tr>
                                        ))}    
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>
                        <ExportCSV 
                            csvData={romero}
                            fileName= 'works'
                            />
                        <br />
                        <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto">
                
                            </div>
                        <div className="px-3 md:px-8 h-auto -mt-28 mb-16">
                            <div className="container mx-auto max-w-full">
                                <div className="grid grid-cols-1 px-4 h-[600px]">
                                    <MapRomero />
                                </div>
                            </div>
                        </div>
                    </Card>
                </TabPane>

                <TabPane active={openTab === 2 ? true : false}>
                    <Card>
                        <br />
                        <CardHeader color="purple" contentPosition="left">
                            <h2 className="text-lg">ICAS</h2>
                        </CardHeader>
                        <CardBody>
                            <div className="overflow-x-auto">
                                <table className="items-center w-full bg-transparent border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            <Icon name="whatshot" fontSize="small" />
                                            Temperatura
                                            </th>
                                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            <Icon name="event" fontSize="small" />
                                            Hora
                                            </th>
                                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            <Icon name="timeline" fontSize="small" />
                                            Frecuencia
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {icas?.map((icasTemps) => (
                                            <tr key={icasTemps.id}>
                                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    {icasTemps.temperature} °C
                                                </td>
                                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    {icasTemps.time} {icasTemps.createdAt}
                                                </td>
                                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    {icasTemps.frequency}
                                                </td>
                                            </tr>
                                        ))}    
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>
                        <ExportCSV 
                            csvData={icas}
                            fileName= 'works'
                            />
                        <br />
                        <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto">
                        </div>
                        <div className="px-3 md:px-8 h-auto -mt-28 mb-16">
                            <div className="container mx-auto max-w-full">
                                <div className="grid grid-cols-1 px-4 h-[600px]">
                                    <MapICAS />
                                </div>
                            </div>
                        </div>
                    </Card>
                </TabPane>

                <TabPane active={openTab === 3 ? true : false}>
                    <Card>
                        <br />
                        <CardHeader color="purple" contentPosition="left">
                            <h2 className="text-lg">Edificio Jon de Cortina</h2>
                        </CardHeader>
                        <CardBody>
                            <div className="overflow-x-auto">
                                <table className="items-center w-full bg-transparent border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            <Icon name="whatshot" fontSize="small" />
                                            Temperatura
                                            </th>
                                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            <Icon name="event" fontSize="small" />
                                            Hora
                                            </th>
                                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            <Icon name="timeline" fontSize="small" />
                                            Frecuencia
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {labs?.map((labsTemps) => (
                                            <tr key={labsTemps.id}>
                                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    {labsTemps.temperature} °C
                                                </td>
                                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    {labsTemps.time} {labsTemps.createdAt}
                                                </td>
                                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    {labsTemps.frequency}
                                                </td>
                                            </tr>
                                        ))}    
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>
                        <ExportCSV 
                            csvData={labs}
                            fileName= 'works'
                            />
                        <br />
                        <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto">
                        </div>
                        <div className="px-3 md:px-8 h-auto -mt-28 mb-16">
                            <div className="container mx-auto max-w-full">
                                <div className="grid grid-cols-1 px-4 h-[600px]">
                                    <MapCortina />
                                </div>
                            </div>
                        </div>
                    </Card>
                </TabPane>

                <TabPane active={openTab === 4 ? true : false}>
                    <Card>
                        <br />
                        <CardHeader color="purple" contentPosition="left">
                            <h2 className="text-lg">Polideportivo UCA</h2>
                        </CardHeader>
                        <CardBody>
                            <div className="overflow-x-auto">
                                <table className="items-center w-full bg-transparent border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            <Icon name="whatshot" fontSize="small" />
                                            Temperatura
                                            </th>
                                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            <Icon name="event" fontSize="small" />
                                            Hora
                                            </th>
                                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            <Icon name="timeline" fontSize="small" />
                                            Frecuencia
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {poli?.map((poliTemps) => (
                                            <tr key={poliTemps.id}>
                                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    {poliTemps.temperature} °C
                                                </td>
                                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    {poliTemps.time} {poliTemps.createdAt}
                                                </td>
                                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    {poliTemps.frequency}
                                                </td>
                                            </tr>
                                        ))}    
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>
                        <ExportCSV 
                            csvData={poli}
                            fileName= 'works'
                            />
                        <br />
                        <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto">
                        </div>
                        <div className="px-3 md:px-8 h-auto -mt-28 mb-16">
                            <div className="container mx-auto max-w-full">
                                <div className="grid grid-cols-1 px-4 h-[600px]">
                                    <MapPoli />
                                </div>
                            </div>
                        </div>
                    </Card>
                </TabPane>
                <TabPane active={openTab === 5 ? true : false}>
                    <Card>
                        <br />
                        <CardHeader color="purple" contentPosition="left">
                            <h2 className="text-lg">En vivo</h2>
                        </CardHeader>
                        <CardBody>
                            <div className="overflow-x-auto">
                                <table className="items-center w-full bg-transparent border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            <Icon name="whatshot" fontSize="small" />
                                            Temperatura
                                            </th>
                                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            <Icon name="event" fontSize="small" />
                                            Hora
                                            </th>
                                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            <Icon name="timeline" fontSize="small" />
                                            Frecuencia
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {live?.map((liveTemps) => (
                                            <tr key={liveTemps.id}>
                                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    {liveTemps.temperature} °C
                                                </td>
                                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    {liveTemps.time} {liveTemps.createdAt}
                                                </td>
                                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    {liveTemps.frequency}
                                                </td>
                                            </tr>
                                        ))}    
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>
                        <ExportCSV 
                            csvData={live}
                            fileName= 'works'
                            />
                        <br />
                        <br />
                        <div className="px-3 md:px-8 h-auto -mt-28 mb-16">
                            <div className="container mx-auto max-w-full">
                                <div className="grid grid-cols-1 px-4 h-[600px]">
                                <div className="relative h-96">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart width={730} height={250} data={live}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="time" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="temperature" fill="#8884d8" />
                                            <Bar dataKey="humidity" fill="#82ca9d" />
                                        </BarChart>
                                    </ResponsiveContainer>                
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </TabPane>
            </TabContent>
        </Tab>
    );
}
