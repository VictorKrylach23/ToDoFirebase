import React from 'react';
import styles from './nav-form-styles.module.css';
import { AddTaskCreator } from './add-task-create-module';
import { useState, useEffect } from 'react';
import { SortTasks } from './filter-tasks-module';

export const NavForm = (props) => {
	const {
		isAdding,
		newToDoTitle,
		setNewToDoTitle,
		handleAddToDo,
		setIsAdding,
		toDo,
		setAlphabetFilter,
		alphabetFilter,
		setResults,
	} = props;

	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		setResults(toDo);
	}, [toDo]);

	const handleSearch = (event) => {
		const query = event.target.value;
		setSearchTerm(query);
		const filteredResults = toDo.filter((item) =>
			item[1].title.toLowerCase().includes(query.toLowerCase()),
		);
		setResults(filteredResults);
	};

	return (
		<form className={styles.navForm}>
			{!isAdding && (
				<input
					className={styles.inputLine}
					value={searchTerm}
					placeholder="Serch tasks"
					onChange={handleSearch}
				></input>
			)}
			<AddTaskCreator
				isAdding={isAdding}
				newToDoTitle={newToDoTitle}
				setNewToDoTitle={setNewToDoTitle}
				handleAddToDo={handleAddToDo}
				setIsAdding={setIsAdding}
			/>
			{!isAdding && (
				<SortTasks
					setAlphabetFilter={setAlphabetFilter}
					alphabetFilter={alphabetFilter}
					toDo={toDo}
				/>
			)}
		</form>
	);
};
