import React, { PropTypes } from 'react';
import { Alert, PageHeader, Input, Panel, Button, Row, Col } from 'react-bootstrap';
import StudentsList from '../../students/containers/students_list';

const Client = ({ error, client: { _id, name, email, phone }, handleUpdateClient }) => (
  <div>
    <PageHeader> { name } </PageHeader>
    <Row>
      <Col md={ 6 }>
        <Panel>
          <PageHeader> Client Info </PageHeader>
          { error ? <Alert bsStyle='danger'>{error}</Alert> : null }

          <form name="edit-client" onSubmit={handleUpdateClient.bind(_id)}>
            <Input type="text" name='name'
               placeholder="Client 1" label="Name"
               defaultValue={name}
              ></Input>
            <Input type="text" name='phone'
               placeholder="(016) 123 4567" label="Phone"
               defaultValue={phone}
              ></Input>
            <Input type="text" name='email'
               placeholder="email@address.com" label="Email"
               defaultValue={email}
              ></Input>
            <Button type='submit' bsStyle="default"> Save </Button>
          </form>
        </Panel>
      </Col>
      <Col md={ 6 }>
        <StudentsList clientId={_id}/>
      </Col>
    </Row>
  </div>
);

Client.propTypes = {
  error: PropTypes.string,
  client: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }),
  handleUpdateClient: PropTypes.func.isRequired,
};

export default Client;
