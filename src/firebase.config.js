import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCWpNTLcEQM1iBGH6cUak_L5z_EogjaS9c',
	authDomain: 'rip-lists.firebaseapp.com',
	projectId: 'rip-lists',
	storageBucket: 'rip-lists.appspot.com',
	messagingSenderId: '194231458077',
	appId: '1:194231458077:web:7b813033483b43d55029f4',
	measurementId: 'G-1RM3WNC18E',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();
