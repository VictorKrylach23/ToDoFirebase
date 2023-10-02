import { ref, update } from 'firebase/database';
import { db } from '../firebase';

export const requestChangeChecked = (props) => {
	const { completed, item } = props;

	const todoesChangeDbRef = ref(db, `todos/${item}`);
	update(todoesChangeDbRef, { completed: !completed });
};
