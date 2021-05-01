import "./styles.css";
import { Accordion, Card } from "react-bootstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [teamData, setTeamData] = useState([]);
  const nbaData = async () => {
    const response = await axios.get(
      "https://www.balldontlie.io/api/v1/teams/"
    );
    setTeamData(response.data.data);
  };
  const renderAccordion = (team, index) => {
    return (
      <Accordion key={index}>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey={team}>
              {team.city} <i>+</i>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={team}>
            <Card.Body>
              <ul>
                <li>Abbreviation: {team.abbreviation}</li>
                <li>Location: {team.city}</li>
                <li>Conference: {team.conference}</li>
                <li>Division: {team.division}</li>
                <li>Team Name: {team.full_name}</li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  };
  useEffect(() => {
    nbaData();
  }, []);
  return (
    <div className="App">
      <h1>NBA Encyclopedia</h1>
      <p>Click on each card to get general information about an NBA team.</p>
      {teamData.map(renderAccordion)}
    </div>
  );
};
export default App;
