import UsersList from '../components/users_list.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections, LocalState} = context();
  const {Users} = Collections;

  const sub = Meteor.subscribe('users.ids');
  const error = LocalState.get('USERS_ERROR');

  if (sub.ready()) {
    const userIds = Users.find().fetch().map(u => u._id);
    onData(null, {userIds, error});
  }
};

const Container = composeAll(
  composeWithTracker(composer),
  useDeps()
)(UsersList);

Container.displayName = 'UsersList';

export default Container;
