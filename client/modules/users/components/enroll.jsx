import React, { PropTypes } from 'react';

const Enroll = ({username, token, handleSubmit}) => (
  <div>
    <h2>Set your new password.</h2>
    <p>{username}, Please set your new password.</p>
    <form name="enroll" onSubmit={handleSubmit.bind(null, token)}>
      <input name="password" type="password" placeholder="new password"/>
      <input name="confirm" type="password" placeholder="confirm password"/>
      <button type="submit">Save</button>
    </form>
  </div>
);

Enroll.propTypes = {
  error: PropTypes.string,
  username: PropTypes.string,
  token: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

export default Enroll;
