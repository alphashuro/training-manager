export default {

  create({ Meteor, LocalState, FlowRouter }, title, description) {
    if (!title || !description ) {
      return LocalState.set('COURSE_ERROR', 'Title description and  are required!');
    }

    LocalState.set('COURSE_ERROR', null);

    const _id = Meteor.uuid();
    const user = Meteor.user();
    const org = user.profile.org;

    Meteor.call( 'courses.create', { _id, title, description, org }, (error) => {
      if (error) {
        return LocalState.set('COURSE_ERROR', error.reason);
      }
    });

    FlowRouter.go(`/courses/${_id}`);
  },

  remove({Meteor, LocalState}, id) {
    if (!id) {
      return LocalState.set('COURSE_ERROR', 'Id is required to remove course.');
    }

    Meteor.call('courses.remove', id, (error) => {
      if (error) { LocalState.set('COURSE_ERROR', error.reason); }
    });
  },

  update({Meteor, LocalState}, id, { title, description }) {
    Meteor.call(
      'courses.update',
      id, { title, description },
      (err) => {
        if (err) { LocalState.set('COURSE_ERROR', err.reason); }
      });
  },

  clearErrors({LocalState}) {
    return LocalState.set('COURSE_ERROR', null);
  }
};
