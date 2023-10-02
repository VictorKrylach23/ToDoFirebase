import { useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

export const useRequestGetToDo = (setIsLoading, setToDO) => {
	useEffect(() => {
		setIsLoading(true);

		const todoesDbRef = ref(db, 'todos');

		return onValue(todoesDbRef, (snapshot) => {
			const loadedTodoes = snapshot.val() || [];
			setToDO(Object.entries(loadedTodoes));
			setIsLoading(false);
		});
	}, []);
};
