import firebase from "firebase"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAZiT342yCtreV1mILY175pamTtt1MgRiE",
    authDomain: "shopping-app-4ce46.firebaseapp.com",
    projectId: "shopping-app-4ce46",
    storageBucket: "shopping-app-4ce46.appspot.com",
    messagingSenderId: "938655346936",
    appId: "1:938655346936:web:c22aba505ada752cdb8b0d",
    measurementId: "G-Q5P0L18C1N"
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const fs = firebase.firestore();

  export {auth, fs}