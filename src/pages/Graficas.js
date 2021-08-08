import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarChart,
  Line,
  LineChart,
} from "recharts";
// react-bootstrap components
import { Card, Table, Container, Row, Col, Tabs, Tab } from "react-bootstrap";

import { ExportCSV } from "../ExportCSV";

function Graficas() {
  const [temps, setTemps] = useState([]);
  const [icas, setIcas] = useState([]);
  const [romero, setRomero] = useState([]);
  const [labs, setLabs] = useState([]);
  const [poli, setPoli] = useState([]);
  const [loading, setLoading] = useState(false);


  const mapReceivedData = (temps) => {
    const transformed = temps.map((element) => {
      const date = new Date(element?.time);
      return { ...element, time: date.toLocaleDateString() };
    });
    return transformed;
  };
  useEffect(() => {
    setLoading(true);
    const getTemps = async () => {
      try {
        const tempResponse = await fetch(
          "http://localhost:8080/api/temperature"
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
    <Container fluid>
      <Row>
        <Col>
          <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Comparativa Humedad y Temperatura</Card.Title>
                <p className="card-category">Monseñor Romero</p>
              </Card.Header>
              <Card.Body>
                <AreaChart width={730} height={250} data={romero}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="temperature" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    <Area type="monotone" dataKey="humidity" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                  </AreaChart>
                </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    
  )
}

export default Graficas;
