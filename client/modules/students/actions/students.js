export default {
  // FIXME: correct parameters
  create({ Meteor, LocalState }, clientId) {
    if ( !clientId ) {
      return LocalState.set('STUDENTS_ERROR', 'ClientId invalid!');
    }

    LocalState.set('STUDENTS_ERROR', null);

    const _id = Meteor.uuid();

    student = {
      _id,
      name: '',
      phone: '',
      email: '',
      clientId
    }

    Meteor.call( 'students.create', student, (error) => {
      if (error) {
        return LocalState.set('STUDENTS_ERROR', error.reason);
      }
    } );
  },

  remove({Meteor, LocalState}, id) {
    if (!id) {
      return LocalState.set('STUDENTS_ERROR', 'Id is required to remove class.');
    }

    Meteor.call('students.remove', id, (error) => {
      if (error) {
        LocalState.set('STUDENTS_ERROR', error.reason);
      }
    });
  },

  update({Meteor, LocalState}, id, { name, phone, email }) {
    Meteor.call( 'students.update', id, { name, phone, email }, (err) => {
      if (err) {
        LocalState.set('STUDENTS_ERROR', err.reason);
      }
    })
  },

  clearErrors({LocalState}) {
    return LocalState.set('STUDENTS_ERROR', null);
  }
}
