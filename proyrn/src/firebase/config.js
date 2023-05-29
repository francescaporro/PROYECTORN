import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDtwR9HDEEAPMoaTIY7vLbpK2It3rtjMOM",
  authDomain: "proy-rn.firebaseapp.com",
  projectId: "proy-rn",
  storageBucket: "proy-rn.appspot.com",
  messagingSenderId: "844887564055",
  appId: "1:844887564055:web:696298038cf9fa9335a152"
  };
  
  app.initializeApp(firebaseConfig)

  export const auth = firebase.auth();
  export const storage = firebase.storage();
  export const db = firebase.firestore();