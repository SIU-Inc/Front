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
import { Card, Table, Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { ExportCSV } from "../ExportCSV";

function Sensor1() {
  const position = [51.505, -0.09]
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
    <Container fluid="xl">
      <Row>
        <Col>
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Sensor de Temperatura</Card.Title>
              <p className="card-category">Temperatura</p>
            </Card.Header>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">

            <Tab eventKey="romero" title="Centro Monseñor Romero">
            <Card.Body className="table-full-width table-responsive px-0">
              <Table responsive>
                <thead>
                  <tr>
                    <th className="border-0">Temperatura</th>
                    <th className="border-0">Hora</th>
                    <th className="border-0">Coordenadas</th>
                    <th className="border-0">Frecuencia</th>
                  </tr>
                </thead>
                <tbody>
                  {romero?.map((romeroTemps) => (
                    <tr key={romeroTemps.id}>
                      <td>{romeroTemps.temperature}</td>
                      <td>{romeroTemps.createdAt}</td>
                      <td>
                        {romeroTemps.latitude}, {romeroTemps.longitude}
                      </td>
                      <td>{romeroTemps.frequency}</td>
                    </tr>
                  ))}
                </tbody>
                <div>
                  <Button variant="contained" color="blue">
                    <ExportCSV 
                      csvData={romero}
                      fileName= 'works'
                    />
                  </Button>
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
                    <Line type="monotone" dataKey="temperature" stroke="#82ca9d" />
                  </LineChart>
                </Card.Body>
                <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                </MapContainer>
              </Card>
            </Col>
            </Tab>

            <Tab eventKey="poli" title="Polideportivo">
            <Card.Body className="table-full-width table-responsive px-0">
              <Table responsive>
                <thead>
                  <tr>
                    <th className="border-0">Temperatura</th>
                    <th className="border-0">Hora</th>
                    <th className="border-0">Coordenadas</th>
                    <th className="border-0">Frecuencia</th>
                  </tr>
                </thead>
                <tbody>
                  {poli?.map((poliTemps) => (
                    <tr key={poliTemps.id}>
                      <td>{poliTemps.temperature}</td>
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
                    fileName= 'works'
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
                    <Line type="monotone" dataKey="temperature" stroke="#82ca9d" />
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
                    <th className="border-0">Temperatura</th>
                    <th className="border-0">Hora</th>
                    <th className="border-0">Coordenadas</th>
                    <th className="border-0">Frecuencia</th>
                  </tr>
                </thead>
                <tbody>
                  {icas?.map((icasTemps) => (
                    <tr key={icasTemps.id}>
                      <td>{icasTemps.temperature}</td>
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
                    fileName= 'works'
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
                    <Line type="monotone" dataKey="temperature" stroke="#82ca9d" />
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
                    <th className="border-0">Temperatura</th>
                    <th className="border-0">Hora</th>
                    <th className="border-0">Coordenadas</th>
                    <th className="border-0">Frecuencia</th>
                  </tr>
                </thead>
                <tbody>
                  {labs?.map((labsTemps) => (
                    <tr key={labsTemps.id}>
                      <td>{labsTemps.temperature}</td>
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
                    fileName= 'works'
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
                    <Line type="monotone" dataKey="temperature" stroke="#82ca9d" />
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

export default Sensor1;
