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
    
  )
}

export default Graficas;
