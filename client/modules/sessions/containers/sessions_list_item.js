import SessionsListItem from '../components/sessions_list_item.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, sessionId}, onData) => {
  const {Meteor, Collections} = context();

  const sub = Meteor.subscribe('sessions.single', sessionId);

  if (sub.ready()) {
    const session = Collections.Sessions.findOne(sessionId);
    const _class = Collections.Classes.findOne(session.classId);

    onData(null, { ...session, class: _class });
  }
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.context = () => context;
  props.update = actions.sessions.update;

  return props;
};

const Container = composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SessionsListItem);

Container.displayName = 'SessionsListItem';

export default Container;
