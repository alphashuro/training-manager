import React from 'react';
import {Table, PageHeader, Button} from 'react-bootstrap';
import {Alert} from 'react-bootstrap';
import FacilitatorsListItem from '../containers/facilitators_list_item';
import EmptyRow from '../../util/components/EmptyRow.jsx';

export const FacilitatorsList = ({ facilitatorIds, error }) => (
  <div>
    <PageHeader>
      Facilitators
      <Button href='/new-facilitator' className='pull-right'>New Facilitator</Button>
    </PageHeader>
    {
      error ? <Alert bsStyle='danger'>{error}</Alert> : null
    }
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {
        facilitatorIds.length ? facilitatorIds.map(
          id => <FacilitatorsListItem key={id} facilitatorId={id}/>
        ) : <EmptyRow/>
      }
      </tbody>
    </Table>
  </div>
);

export default FacilitatorsList;
