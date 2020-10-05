import * as firebase from 'firebase';
import "firebase/database";
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBZB3NdZdhDzi7XL7cFXEizLbVHhl0F7ew",
    authDomain: "react-native-tutorial-a07b0.firebaseapp.com",
    databaseURL: "https://react-native-tutorial-a07b0.firebaseio.com",
    projectId: "react-native-tutorial-a07b0",
    storageBucket: "react-native-tutorial-a07b0.appspot.com",
    messagingSenderId: "58534102189",
    appId: "1:58534102189:web:eb25d0894f79cf38473224",
    measurementId: "G-9FT44W93ET"
};

firebase.initializeApp(firebaseConfig);

export { firebase };