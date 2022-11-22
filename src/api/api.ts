import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, doc, addDoc, getDocs, getFirestore, deleteDoc, updateDoc } from '@firebase/firestore';
import { ITodo } from './types';

export const initializeAPI = (): FirebaseApp => {
  const firebaseApp = initializeApp({
    apiKey: 'AIzaSyDKDuhe7Y1a9-u2BTR4rsH8EXRg1vtm04o',
    authDomain: 'todo-app-9c337.firebaseapp.com',
    projectId: 'todo-app-9c337',
    storageBucket: 'todo-app-9c337.appspot.com',
    messagingSenderId: '40492395478',
    appId: '1:40492395478:web:52fc77e5d8e6047b54d277',
  });

  getAuth(firebaseApp);
  getFirestore(firebaseApp);

  return firebaseApp;
};

export const getTodosCollectionFromUser = async (userId: string): Promise<ITodo[]> => {
  const db = getFirestore();

  const todos: ITodo[] = [];

  try {
    const querySnapshot = await getDocs(collection(doc(db, 'users', userId), 'todos'));

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<ITodo, 'id'>;

      todos.push({
        id: doc.id,
        ...data,
      });
    });
  } catch (error) {
    return Promise.reject(error);
  }

  return todos;
};

export const addTodoToUserCollection = async (userId: string, task: string) => {
  const db = getFirestore();

  try {
    await addDoc(collection(doc(db, 'users', userId), 'todos'), {
      name: task,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const removeTodoFromUserCollection = async (userId: string, id: string) => {
  const db = getFirestore();

  try {
    const docRef = doc(doc(db, 'users', userId), 'todos', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const updateTodoFromUserCollection = async (userId: string, id: string, value: string) => {
  const db = getFirestore();

  try {
    const docRef = doc(doc(db, 'users', userId), 'todos', id);
    await updateDoc(docRef, {
      name: value,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
