export default {
  select({LocalState}, clientId) {
    LocalState.set('SELECTED_CLIENT', clientId);
  }
};
