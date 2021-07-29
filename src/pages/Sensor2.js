import React, { useState, useEffect } from "react";
import {
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

function Sensor2() {
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
          if (temp.id > 200 && temp.id < 301) {
            labsTemps.push(temp);
          }
          if (temp.id > 301 && temp.id < 344) {
            romeroTemps.push(temp);
          }
          if (temp.id > 345 && temp.id < 396) {
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
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Sensor de Humedad</Card.Title>
              <p className="card-category">Humedad</p>
            </Card.Header>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">

            <Tab eventKey="romero" title="Centro Monseñor Romero">
            <Card.Body className="table-full-width table-responsive px-0">
              <Table responsive>
                <thead>
                  <tr>
                    <th className="border-0">ID</th>
                    <th className="border-0">Humedad</th>
                    <th className="border-0">Hora</th>
                    <th className="border-0">Coordenadas</th>
                    <th className="border-0">Frecuencia</th>
                  </tr>
                </thead>
                <tbody>
                  {romero?.map((romeroTemps) => (
                    <tr key={romeroTemps.id}>
                      <td>{romeroTemps.id}</td>
                      <td>{romeroTemps.humidity}</td>
                      <td>{romeroTemps.createdAt}</td>
                      <td>
                        {romeroTemps.latitude}, {romeroTemps.longitude}
                      </td>
                      <td>{romeroTemps.frequency}</td>
                    </tr>
                  ))}
                </tbody>
                <div>
                  <ExportCSV
                    csvData={romero}
                    fileName= 'C. M. Romero'
                  />
                </div>
              </Table>
                </Card.Body>
                <Col md="12">
              <Card className="card-plain table-plain-bg">
                <Card.Header>
                  <Card.Title as="h4">Comparativa</Card.Title>
                  <p className="card-category">Gráfica</p>
                </Card.Header>
                <Card.Body>
                  <LineChart
                    width={730}
                    height={250}
                    data={romero}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
                  </LineChart>
                </Card.Body>
              </Card>
            </Col>
            </Tab>

            <Tab eventKey="poli" title="Polideportivo">
            <Card.Body className="table-full-width table-responsive px-0">
              <Table responsive>
                <thead>
                  <tr>
                    <th className="border-0">ID</th>
                    <th className="border-0">Temperatura</th>
                    <th className="border-0">Hora</th>
                    <th className="border-0">Coordenadas</th>
                    <th className="border-0">Frecuencia</th>
                  </tr>
                </thead>
                <tbody>
                  {poli?.map((poliTemps) => (
                    <tr key={poliTemps.id}>
                      <td>{poliTemps.id}</td>
                      <td>{poliTemps.humidity}</td>
                      <td>{poliTemps.createdAt}</td>
                      <td>
                        {poliTemps.latitude}, {poliTemps.longitude}
                      </td>
                      <td>{poliTemps.frequency}</td>
                    </tr>
                  ))}
                </tbody>
                <div>
                  <ExportCSV
                    csvData={poli}
                    fileName= 'Polideportivo'
                  />
                </div>
              </Table>
                </Card.Body>
                <Col md="12">
              <Card className="card-plain table-plain-bg">
                <Card.Header>
                  <Card.Title as="h4">Comparativa</Card.Title>
                  <p className="card-category">Gráfica</p>
                </Card.Header>
                <Card.Body>
                  <LineChart
                    width={730}
                    height={250}
                    data={poli}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
                  </LineChart>
                </Card.Body>
              </Card>
            </Col>
            </Tab>

            <Tab eventKey="icas" title="ICAS">
            <Card.Body className="table-full-width table-responsive px-0">
              <Table responsive>
                <thead>
                  <tr>
                    <th className="border-0">ID</th>
                    <th className="border-0">Temperatura</th>
                    <th className="border-0">Hora</th>
                    <th className="border-0">Coordenadas</th>
                    <th className="border-0">Frecuencia</th>
                  </tr>
                </thead>
                <tbody>
                  {icas?.map((icasTemps) => (
                    <tr key={icasTemps.id}>
                      <td>{icasTemps.id}</td>
                      <td>{icasTemps.humidity}</td>
                      <td>{icasTemps.createdAt}</td>
                      <td>
                        {icasTemps.latitude}, {icasTemps.longitude}
                      </td>
                      <td>{icasTemps.frequency}</td>
                    </tr>
                  ))}
                </tbody>
                <div>
                  <ExportCSV
                    csvData={icas}
                    fileName= 'ICAS'
                  />
                </div>
              </Table>
                </Card.Body>
                <Col md="12">
              <Card className="card-plain table-plain-bg">
                <Card.Header>
                  <Card.Title as="h4">Comparativa</Card.Title>
                  <p className="card-category">Gráfica</p>
                </Card.Header>
                <Card.Body>
                  <LineChart
                    width={730}
                    height={250}
                    data={icas}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
                  </LineChart>
                </Card.Body>
              </Card>
            </Col>
            </Tab>

            <Tab eventKey="Labs" title="Labotorios">
            <Card.Body className="table-full-width table-responsive px-0">
              <Table responsive>
                <thead>
                  <tr>
                    <th className="border-0">ID</th>
                    <th className="border-0">Temperatura</th>
                    <th className="border-0">Hora</th>
                    <th className="border-0">Coordenadas</th>
                    <th className="border-0">Frecuencia</th>
                  </tr>
                </thead>
                <tbody>
                  {labs?.map((labsTemps) => (
                    <tr key={labsTemps.id}>
                      <td>{labsTemps.id}</td>
                      <td>{labsTemps.humidity}</td>
                      <td>{labsTemps.createdAt}</td>
                      <td>
                        {labsTemps.latitude}, {labsTemps.longitude}
                      </td>
                      <td>{labsTemps.frequency}</td>
                    </tr>
                  ))}
                </tbody>
                <div>
                  <ExportCSV
                    csvData={labs}
                    fileName= 'Laboratorios'
                  />
                </div>
              </Table>
                </Card.Body>
                <Col md="12">
              <Card className="card-plain table-plain-bg">
                <Card.Header>
                  <Card.Title as="h4">Comparativa</Card.Title>
                  <p className="card-category">Gráfica</p>
                </Card.Header>
                <Card.Body>
                  <LineChart
                    width={730}
                    height={250}
                    data={labs}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
                  </LineChart>
                </Card.Body>
              </Card>
            </Col>
            </Tab>

            </Tabs>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Sensor2;
