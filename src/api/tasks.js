import { db } from '../firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  getDocs,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

export const addTask = async (userId, task) => {
  try {
    const docRef = await addDoc(collection(db, 'users', userId, 'tasks'), {
      ...task,
      createdAt: serverTimestamp(),
    });

    return { id: docRef.id, ...task };
  } catch (error) {
    console.error('Ошибка при добавлении задачи:', error.message);
    throw error;
  }
};

export const getTasks = async (userId) => {
  const q = query(collection(db, 'users', userId, 'tasks'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const deleteTask = async (userId, taskId) => {
  try {
    const taskRef = doc(db, 'users', userId, 'tasks', taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error('Ошибка при удалении задачи:', error.message);
    throw error;
  }
};

export const updateTask = async (userId, taskId, updatedTask) => {
  try {
    const taskRef = doc(db, 'users', userId, 'tasks', taskId);
    await updateDoc(taskRef, updatedTask);
  } catch (error) {
    console.error('Ошибка при обновлении задачи:', error.message);
    throw error;
  }
};