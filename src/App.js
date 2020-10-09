import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Col,
  Nav,
  Navbar,
  Jumbotron,
  Form,
  Container,
  Button,
} from "react-bootstrap";
import axios from "axios";

const FINDING_FALCON_BASE_URL = "https://findfalcone.herokuapp.com";

function App() {
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const fetchPlanets = (endpoint) => {
    axios.get(`${FINDING_FALCON_BASE_URL}/planets`).then((resp) => {
      setPlanets(resp.data);
    });
  };

  const fetchVehicles = (endpoint) => {
    axios.get(`${FINDING_FALCON_BASE_URL}/vehicles`).then((resp) => {
      setVehicles(resp.data);
    });
  };

  useEffect(() => {
    fetchPlanets();
    fetchVehicles();
  }, []);

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand>Finding Falcon</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link>Reset</Nav.Link>
          <Nav.Link>Geek Trust Home</Nav.Link>
        </Nav>
      </Navbar>
      <Jumbotron>
        <h1>Select Planets to Search in</h1>
        <hr />
        <Form>
          <Form.Row>
            <Col>
              <PlanetDropdown label="Destination 1" planets={planets} />
              <Vehicles vehicles={vehicles} />
            </Col>
            <Col>
              <PlanetDropdown label="Destination 2" planets={planets} />
              <Vehicles vehicles={vehicles} />
            </Col>
            <Col>
              <PlanetDropdown label="Destination 3" planets={planets} />
              <Vehicles vehicles={vehicles} />
            </Col>
            <Col>
              <PlanetDropdown label="Destination 4" planets={planets} />
              <Vehicles vehicles={vehicles} />
            </Col>
          </Form.Row>
        </Form>
      </Jumbotron>
      <Container className="text-center">
        <Button>Find Falcon</Button>
      </Container>
    </>
  );
}

const PlanetDropdown = (props) => {
  const { label, planets } = props;
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control as="select">
        {planets.length > 0 ? (
          planets.map((planet, i) => <option key={i}>{planet.name}</option>)
        ) : (
          <option>Loading...</option>
        )}
      </Form.Control>
    </Form.Group>
  );
};

const Vehicles = (props) => {
  const { vehicles } = props;
  return (
    <Form.Group>
      {vehicles.length > 0 ? (
        vehicles.map((vehicle, i) => (
          <Form.Check
            type="radio"
            key={`radio ${i}`}
            aria-label="radio 1"
            name="vehicles"
            label={`${vehicle.name} (${vehicle.total_no})`}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </Form.Group>
  );
};

export default App;
