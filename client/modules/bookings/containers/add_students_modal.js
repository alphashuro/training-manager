import AddStudentsModal from '../components/add_students_modal.jsx';

import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {LocalState} = context();

  const show = LocalState.get('STUDENTS_MODAL');
  onData(null, {show});
};

export const depsMapper = (context, actions) => {
  const props = {};

  props.context = () => context;
  props.close = actions.bookingStudents.closeModal;

  return props;
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(AddStudentsModal);
