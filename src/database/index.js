import Firebase from "firebase";

const firebaseConfig = {
  apiKey: 'AIzaSyDvZzbIDCAlqV-Ke7RiXR2ESovTDsyuM9s',
  authDomain: 'shopholic-c7d5a.firebaseapp.com',
  databaseURL: 'https://shopholic-c7d5a-default-rtdb.firebaseio.com',
  projectId: 'shopholic-c7d5a',
  storageBucket: 'shopholic-c7d5a.appspot.com',
  messagingSenderId: '449231054899',
  appId: '1:449231054899:android:c89bac1a765738d9641b46',
};
const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();
