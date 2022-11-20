import React from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
// import { fas } from 'fontawesome.macro';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro';



function DiagnosisOld() {
  return (
    <Container>
    <Row>
      <Col>
        <Card>
        <Card.Header>Diagnosis System</Card.Header>
          <Row>
            <Col></Col>
            <Col>

              <Card>
                <Card.Img variant="top"></Card.Img>
                <Card.Body>
                  <Card.Title><FontAwesomeIcon icon={faUserDoctor} fontSize="100px"/><br />Doctor</Card.Title>
                  <Card.Text>
                    <FontAwesomeIcon icon="fa-solid fa-user-doctor" />
                    Login with ID / Password
                  </Card.Text>
                </Card.Body>
                {/* <ListGroup className="list-group-flush">
                  <ListGroup.Item>Cras justo odio</ListGroup.Item>
                  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup> */}
                <Card.Body>
                  <Card.Link href="#DoctorLogin">Login</Card.Link>
                </Card.Body>
              </Card>

            </Col>
            <Col>

              <Card>
                <Card.Img variant="top" />
                <Card.Body>
                  <Card.Title><FontAwesomeIcon icon={faUsers} fontSize="100px"/><br />Patient</Card.Title>
                  <Card.Text>
                    Login with wallet
                  </Card.Text>
                </Card.Body>
                {/* <ListGroup className="list-group-flush">
                  <ListGroup.Item>Cras justo odio</ListGroup.Item>
                  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup> */}
                <Card.Body>
                  <Card.Link href="#PatientLogin">Connect</Card.Link>
                </Card.Body>
              </Card>

            </Col>
            <Col></Col>
          </Row>

        </Card>
      </Col>
    </Row>
    </Container>

  );
}

export default DiagnosisOld;