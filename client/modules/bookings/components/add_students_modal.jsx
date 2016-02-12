import React from 'react';

import ClientsSelect from '../containers/clients_select';
import StudentsSelect from '../containers/students_select';

import { Modal, Button, Grid, Row, Col } from 'react-bootstrap';
const { Header, Title, Body, Footer } = Modal;

const AddStudentsModal = ({bookingId, show, close}) => (
  <Modal show={show}>
    <Header>
      <Title>Add Students to {bookingId}</Title>
    </Header>
    <Body>
      <Grid fluid>
        <Row>
          <Col>
            <ClientsSelect />
          </Col>
        </Row>
        <Row>
          <Col>
            <StudentsSelect bookingId={bookingId} />
          </Col>
        </Row>
      </Grid>
    </Body>
    <Footer>
      <Button onClick={close}>Close</Button>
    </Footer>
  </Modal>
);

export default AddStudentsModal;
