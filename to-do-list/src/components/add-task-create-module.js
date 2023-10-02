import styles from './nav-form-styles.module.css';

export const AddTaskCreator = (props) => {
	const { isAdding, newToDoTitle, setNewToDoTitle, handleAddToDo, setIsAdding } = props;

	return isAdding ? (
		<>
			<span className={styles.textForAddInput}>Add new task</span>
			<input
				className={styles.inputLine}
				type="text"
				value={newToDoTitle}
				onChange={(e) => setNewToDoTitle(e.target.value)}
				onBlur={handleAddToDo}
				onKeyPress={(e) => {
					if (e.key === 'Enter') handleAddToDo();
				}}
				autoFocus
			/>
		</>
	) : (
		<button onClick={() => setIsAdding(true)}>+</button>
	);
};
