import './App.css';
import { useState } from 'react';
import { NavForm, ToDoList } from './components';
import { useRequestGetToDo } from './hooks';
import { ref, push } from 'firebase/database';
import { db } from './firebase';

function App() {
	const [toDo, setToDO] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [refreshToDo, setRefreshToDo] = useState(false);
	const [results, setResults] = useState('');
	const [alphabetFilter, setAlphabetFilter] = useState(false);

	useRequestGetToDo(setIsLoading, setToDO);

	const [newToDoTitle, setNewToDoTitle] = useState('');
	const [isAdding, setIsAdding] = useState(false);

	const requestAddToDo = (newToDo) => {
		const todoesDbRef = ref(db, 'todos');
		push(todoesDbRef, newToDo).then(() => {
			setRefreshToDo(!refreshToDo);
		});
	};

	const handleAddToDo = () => {
		const newToDo = {
			userId: Math.random(),
			id: Date.now(),
			title: newToDoTitle,
			completed: false,
		};

		requestAddToDo(newToDo);
		setNewToDoTitle('');
		setIsAdding(false);
	};

	return (
		<>
			<div className="toDo">ToDoList</div>
			<NavForm
				isAdding={isAdding}
				newToDoTitle={newToDoTitle}
				setNewToDoTitle={setNewToDoTitle}
				handleAddToDo={handleAddToDo}
				setIsAdding={setIsAdding}
				toDo={toDo}
				setAlphabetFilter={setAlphabetFilter}
				alphabetFilter={alphabetFilter}
				setToDO={setToDO}
				setResults={setResults}
				results={results}
			/>
			<ToDoList
				isLoading={isLoading}
				toDo={toDo}
				isAdding={isAdding}
				newToDoTitle={newToDoTitle}
				setNewToDoTitle={setNewToDoTitle}
				handleAddToDo={handleAddToDo}
				setIsAdding={setIsAdding}
				setRefreshToDo={setRefreshToDo}
				refreshToDo={refreshToDo}
				results={results}
				alphabetFilter={alphabetFilter}
			/>
		</>
	);
}

export default App;
