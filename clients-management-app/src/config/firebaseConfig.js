import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBIE9UnFNNG6bx4rojnIYB1TOnOTID17zc",
  authDomain: "clients-management-app.firebaseapp.com",
  databaseURL: "https://clients-management-app.firebaseio.com",
  projectId: "clients-management-app",
  storageBucket: "clients-management-app.appspot.com",
  messagingSenderId: "163541115927",
  appId: "1:163541115927:web:3b04e4d4ab5dc62b"
};

// class FirebaseConfig {
//   constructor() {
//     this.firebase = firebase;
//     firebase.initializeApp(firebaseConfig);
//   }
// }

firebase.initializeApp(firebaseConfig);

export default firebase;
