import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0XslIC6ftIiO4Gz-2GkeDxjGGTNJ-j6Q",
  authDomain: "healthtracker-62372.firebaseapp.com",
  databaseURL: "https://healthtracker-62372.firebaseio.com",
  projectId: "healthtracker-62372",
  storageBucket: "healthtracker-62372.appspot.com",
  messagingSenderId: "289322573005",
  appId: "1:289322573005:web:8e62cd12adc1d830c41d84"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
</script>

export const auth = firebase.auth();

export const db = firebase.firestore();
