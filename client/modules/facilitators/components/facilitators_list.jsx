import React from 'react';
import {Table, PageHeader, Button} from 'react-bootstrap';
import FacilitatorsListItem from '../containers/facilitators_list_item';

export const FacilitatorsList = ({ facilitatorIds }) => (
  <div>
    <PageHeader>
      Facilitators
      <Button href='/new-facilitator' className='pull-right'>New Facilitator</Button>
    </PageHeader>
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
        facilitatorIds.map( id => (
          <FacilitatorsListItem
            key={id}
            facilitatorId={id}
            />
          )
        )
      }
      </tbody>
    </Table>
  </div>
);

export default FacilitatorsList;
