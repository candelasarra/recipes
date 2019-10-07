import React, { useEffect } from 'react';
import useFirebaseSignIn from '../firebase';
import useFormInput from './Hooks';

const SignIn = ({ onSignedin, onSignedout }) => {
  const email = useFormInput();
  const password = useFormInput();

  const { user, onSubmit: handleSubmit } = useFirebaseSignIn(
    email.value,
    password.value
  );

  useEffect(() => {
    if (user) {
      onSignedin();
    } else {
      onSignedout();
    }
  }, [user, onSignedin, onSignedout]);

  return (
    <form onSubmit={handleSubmit}>
      <input {...email} />
      <input {...password} />
      <button type="submit">Sign in</button>
    </form>
  );
};
export default SignIn;
