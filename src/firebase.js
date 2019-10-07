import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/database'; // If using Firebase database
import 'firebase/storage';
import 'firebase/auth';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBtcsy5C9cnYpTbFlUQIrdhhM_MID4cSPo',
  authDomain: 'candelarecipes.firebaseapp.com',
  databaseURL: 'https://candelarecipes.firebaseio.com',
  projectId: 'candelarecipes',
  storageBucket: 'gs://candelarecipes.appspot.com/',
  messagingSenderId: '1074390876285',
  appId: '1:1074390876285:web:8d5ae189e6d0ac8b'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const itemsRef = firebase.database();

const storage = firebase.storage();
export { itemsRef, storage };

export default function useFirebaseSignIn(email, password) {
  const [loginError, setLoginError] = useState(null);
  const [user, setUser] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }
    setSubmitted(true);
    console.log('hi in firebase file');
  }

  useEffect(() => {
    if (email && password && submitted) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function(error) {
          // Handle Errors here.
          setLoginError(error.message);
        });
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          setUser(user);
          setSubmitted(false);
        } else {
          setUser(null);
          setSubmitted(false);
        }
      });
    }
  }, [email, password, submitted]);

  return { loginError, user, submitted, onSubmit: handleSubmit };
}
