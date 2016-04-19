import UsersListItem from '../components/users_list_item.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import LoadingRow from '../../util/components/LoadingRow.jsx';

export const composer = ({context, userId}, onData) => {
  const {Meteor, Collections} = context();
  const {Users} = Collections;

  const sub = Meteor.subscribe('users.single', userId);

  if (sub.ready()) {
    const user = Users.findOne(userId);
    onData(null, {
      _id: user._id,
      email: user.email(),
      name: user.name(),
      phone: user.phone(),
      roles: user.roles.toString()
    });
  }
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.context = () => context;
  props.handleSendInvite = id => actions.users.invite(id);
  props.handleSendResetPasswordEmail = id => actions.users.sendResetPasswordEmail(id);
  props.handleRemove = id => actions.users.remove(id);

  return props;
};

const Container = composeAll(
  composeWithTracker(composer, LoadingRow),
  useDeps(depsMapper)
)(UsersListItem);

Container.displayName = 'UsersListItem';

export default Container;
