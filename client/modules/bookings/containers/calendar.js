import Calendar from '../components/calendar.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  const sub = Meteor.subscribe('sessions.all');

  if (sub.ready()) {
    const sessions = Collections.Sessions.find().fetch();

    const events = sessions.map(s => ({
      start: s.date,
      end: s.endDate()
    }));

    onData(null, {events});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Calendar);
