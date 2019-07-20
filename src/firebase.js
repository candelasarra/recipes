import firebase from 'firebase/app';
import 'firebase/database'; // If using Firebase database
import 'firebase/storage';

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
