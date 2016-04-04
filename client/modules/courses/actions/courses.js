export default {

  create(
    { Meteor, LocalState, FlowRouter },
    title,
    description
    ) {
    if (!title ) {
      return LocalState.set('COURSE_ERROR', 'Title is required!');
    }
    if (!description ) {
      return LocalState.set('COURSE_ERROR', 'Description is required!');
    }

    LocalState.set('COURSE_ERROR', null);

    const _id = Meteor.uuid();

    Meteor.call( 'courses.create', { _id, title, description }, (error) => {
      if (error) {
        return LocalState.set('COURSE_ERROR', error.reason);
      }
      FlowRouter.go(`/courses/${_id}`);
    });
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
    if(!id) {
      return LocalState.set('COURSE_ERROR', 'Id is required to update a course!');
    };

    if(!title || !description) {
      return LocalState.set('COURSE_ERROR', 'Title and/or description is required to update a course!');
    };

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
