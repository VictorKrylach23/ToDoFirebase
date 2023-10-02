import styles from './todo-list-styles.module.css';
import { useState } from 'react';
import { DeleteTaskButton } from './delete-button-module';
import { ChangeTaskButton } from './change-button-module';
import { requestChangeChecked } from './change-checked-request-module';
import { ref, update } from 'firebase/database';
import { db } from '../firebase';

export const ToDoList = (props) => {
	const {
		isLoading,
		toDo,
		isDeleting,
		requestDeleteToDo,
		setRefreshToDo,
		refreshToDo,
		results,
		alphabetFilter,
	} = props;

	const [editing, setEditing] = useState(null);
	const [newTitle, setNewTitle] = useState('');

	const handleChangeTitle = (id, completed, userId, item) => {
		const updatedTask = {
			userId: userId,
			id: id,
			title: newTitle,
			completed: completed,
		};

		const todoesChangeDbRef = ref(db, `todos/${item}`);
		update(todoesChangeDbRef, updatedTask)
			.then(() => {
				setRefreshToDo(!refreshToDo);
			})
			.then(() => {
				setEditing(null);
				setNewTitle('');
				setRefreshToDo(!refreshToDo);
			})
			.catch((error) => {
				console.error('Ошибка при обновлении задачи:', error);
			});
	};

	return (
		<ol className={styles.list}>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				(alphabetFilter && alphabetFilter !== toDo
					? alphabetFilter
					: results && results !== toDo
					? results
					: toDo
				).map(([item, { id, title, completed, userId }]) => (
					<li key={item}>
						{editing === id ? (
							<>
								<input
									type="text"
									value={newTitle}
									onChange={(e) => setNewTitle(e.target.value)}
								/>
								<button
									onClick={() =>
										handleChangeTitle(id, completed, userId, item)
									}
								>
									save
								</button>
							</>
						) : (
							title
						)}

						<input
							type="checkbox"
							className={styles.isComplitedCheckbox}
							checked={completed}
							onChange={() =>
								requestChangeChecked({
									completed,
									item,
								})
							}
						></input>
						<ChangeTaskButton
							id={id}
							title={title}
							setEditing={setEditing}
							setNewTitle={setNewTitle}
						/>
						<DeleteTaskButton
							isDeleting={isDeleting}
							requestDeleteToDo={requestDeleteToDo}
							item={item}
						/>
					</li>
				))
			)}
		</ol>
	);
};
