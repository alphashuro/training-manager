export default {

  create({ Meteor, LocalState }, courseId) {
    if ( !courseId ) {
      return LocalState.set('CLASSES_ERROR', 'CourseId invalid!');
    }

    LocalState.set('CLASSES_ERROR', null);

    const _id = Meteor.uuid();

    _class = {
      _id,
      title: '',
      description: '',
      duration: 0,
      price: 0,
      courseId
    }

    Meteor.call( 'classes.create', _class, (error) => {
      if (error) {
        return LocalState.set('CLASSES_ERROR', error.reason);
      }
    } );
  },

  remove({Meteor, LocalState}, id) {
    if (!id) {
      return LocalState.set('CLASSES_ERROR', 'Id is required to remove class.');
    }

    Meteor.call('classes.remove', id, (error) => {
      if (error) {
        LocalState.set('CLASSES_ERROR', error.reason);
      }
    });
  },

  update({Meteor, LocalState}, id, { title, description, duration, price }) {
    Meteor.call( 'classes.update', id, { title, description, duration, price }, (err) => {
      if (err) {
        LocalState.set('CLASSES_ERROR', err.reason);
      }
    })
  },

  clearErrors({LocalState}) {
    return LocalState.set('CLASSES_ERROR', null);
  }
}
