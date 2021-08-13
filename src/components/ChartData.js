import { useEffect, useState } from 'react';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Tab from "@material-tailwind/react/Tab";
import TabList from "@material-tailwind/react/TabList";
import TabItem from "@material-tailwind/react/TabItem";
import TabContent from "@material-tailwind/react/TabContent";
import TabPane from "@material-tailwind/react/TabPane";
import Icon from "@material-tailwind/react/Icon";
import {
    Legend,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    BarChart,
    ResponsiveContainer,
    Line,
    LineChart,
  } from "recharts";

export default function ChartLine() {
    const [openTab, setOpenTab] = useState(1);
    const [temps, setTemps] = useState([]);
    const [icas, setIcas] = useState([]);
    const [romero, setRomero] = useState([]);
    const [labs, setLabs] = useState([]);
    const [poli, setPoli] = useState([]);
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
            });
            setLabs(mapReceivedData(labsTemps));
            setRomero(mapReceivedData(romeroTemps));
            setPoli(mapReceivedData(poliTemps));
            setIcas(mapReceivedData(icasTemps));
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
            </TabList>
            <TabContent>
                <TabPane active={openTab === 1 ? true : false}>
                    <Card>
                        <br/>
                        <CardHeader color="purple" contentPosition="left">
                            <h2 className="text-white text-2xl">Datos de Temperatura y Humedad</h2>
                        </CardHeader>
                        <CardBody>
                            <div className="relative h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart width={730} height={250} data={romero}>
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
                        </CardBody>
                        <br />
                        <br />
                        <CardHeader color="purple" contentPosition="left">
                            <h2 className="text-white text-2xl"> Gráfica de Temperaturas</h2>
                        </CardHeader>
                        <CardBody>
                            <div className="relative h-96">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                    width={500}
                                    height={300}
                                    data={romero}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                    >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>       
                            </div>
                        </CardBody>
                        <br />
                        <br />
                        <CardHeader color="purple" contentPosition="left">
                            <h2 className="text-white text-2xl">Gráfica de Humedad</h2>
                        </CardHeader>
                        <CardBody>
                            <div className="relative h-96">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                    width={500}
                                    height={300}
                                    data={romero}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                    >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="humidity" stroke="#82ca9d" activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>       
                            </div>
                        </CardBody>
                    </Card>
                </TabPane>

                <TabPane active={openTab === 2 ? true : false}>
                    <Card>
                        <br/>
                        <CardHeader color="purple" contentPosition="left">
                            <h2 className="text-white text-2xl">Datos de Temperatura y Humedad</h2>
                        </CardHeader>
                        <CardBody>
                            <div className="relative h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart width={730} height={250} data={icas}>
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
                        </CardBody>
                        <br />
                        <br />
                        <CardHeader color="purple" contentPosition="left">
                            <h2 className="text-white text-2xl"> Gráfica de Temperaturas</h2>
                        </CardHeader>
                        <CardBody>
                            <div className="relative h-96">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                    width={500}
                                    height={300}
                                    data={icas}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                    >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>       
                            </div>
                        </CardBody>
                        <br />
                        <br />
                        <CardHeader color="purple" contentPosition="left">
                            <h2 className="text-white text-2xl">Gráfica de Humedad</h2>
                        </CardHeader>
                        <CardBody>
                            <div className="relative h-96">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                    width={500}
                                    height={300}
                                    data={icas}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                    >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="humidity" stroke="#82ca9d" activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>       
                            </div>
                        </CardBody>
                    </Card>
                </TabPane>

                <TabPane active={openTab === 3 ? true : false}>
                    <Card>
                        <br/>
                        <CardHeader color="purple" contentPosition="left">
                            <h2 className="text-white text-2xl">Datos de Temperatura y Humedad</h2>
                        </CardHeader>
                        <CardBody>
                            <div className="relative h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart width={730} height={250} data={labs}>
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
                        </CardBody>
                        <br />
                        <br />
                        <CardHeader color="purple" contentPosition="left">
                            <h2 className="text-white text-2xl"> Gráfica de Temperaturas</h2>
                        </CardHeader>
                        <CardBody>
                            <div className="relative h-96">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                    width={500}
                                    height={300}
                                    data={labs}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                    >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>       
                            </div>
                        </CardBody>
                        <br />
                        <br />
                        <CardHeader color="purple" contentPosition="left">
                            <h2 className="text-white text-2xl">Gráfica de Humedad</h2>
                        </CardHeader>
                        <CardBody>
                            <div className="relative h-96">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                    width={500}
                                    height={300}
                                    data={labs}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                    >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="humidity" stroke="#82ca9d" activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>       
                            </div>
                        </CardBody>
                    </Card>
                </TabPane>

                <TabPane active={openTab === 4 ? true : false}>
                    <Card>
                        <br/>
                        <CardHeader color="purple" contentPosition="left">
                            <h2 className="text-white text-2xl">Datos de Temperatura y Humedad</h2>
                        </CardHeader>
                        <CardBody>
                            <div className="relative h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart width={730} height={250} data={poli}>
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
                        </CardBody>
                        <br />
                        <br />
                        <CardHeader color="purple" contentPosition="left">
                            <h2 className="text-white text-2xl"> Gráfica de Temperaturas</h2>
                        </CardHeader>
                        <CardBody>
                            <div className="relative h-96">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                    width={500}
                                    height={300}
                                    data={poli}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                    >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>       
                            </div>
                        </CardBody>
                        <br />
                        <br />
                        <CardHeader color="purple" contentPosition="left">
                            <h2 className="text-white text-2xl">Gráfica de Humedad</h2>
                        </CardHeader>
                        <CardBody>
                            <div className="relative h-96">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                    width={500}
                                    height={300}
                                    data={poli}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                    >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="humidity" stroke="#82ca9d" activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>       
                            </div>
                        </CardBody>
                    </Card>
                </TabPane>
                
            </TabContent>
        </Tab>    
        
    );
}
