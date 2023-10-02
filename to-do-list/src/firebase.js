import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyAQ-c35-FVBCPykcb-O0Fksjzw8em-zsPQ',
	authDomain: 'todoapp-a4527.firebaseapp.com',
	projectId: 'todoapp-a4527',
	storageBucket: 'todoapp-a4527.appspot.com',
	messagingSenderId: '513235587854',
	appId: '1:513235587854:web:61e69a2c2a128824abfd5f',
	databaseURL: 'https://todoapp-a4527-default-rtdb.firebaseio.com/',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
