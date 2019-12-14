import firebase from 'firebase'
import firestore from 'firebase/firestore'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDDCsWkE7Q_-BqqXiap-ZZFN_XbZaKbtsg",
    authDomain: "crud-vue-6de75.firebaseapp.com",
    databaseURL: "https://crud-vue-6de75.firebaseio.com",
    projectId: "crud-vue-6de75",
    storageBucket: "crud-vue-6de75.appspot.com",
    messagingSenderId: "914505009050",
    appId: "1:914505009050:web:9411eb7e5ecd9eeb969c23",
    measurementId: "G-S1TD2ZTL77"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebaseApp.firestore().settings({timestampsInSnapshots: true})
  // export firestore database
  export default firebaseApp.firestore()