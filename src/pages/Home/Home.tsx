import React, { FC, useEffect, useState } from 'react';
import { useAuthContext } from '../../features/auth/AuthContextProvider';
import { getTodosCollectionFromUser } from '../../api/api';
import { ITodo } from '../../api/types';
import TodoItem from '../../components/TodoItem/TodoItem';
import CreateTodoInput from '../../components/CreateTodoInput/CreateTodoInput';

const Home: FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const { user, logout } = useAuthContext();

  useEffect(() => {
    getTodosCollectionFromUser(user.reloadUserInfo.localId).then(setTodos);
  });

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <div className="flex justify-center items-center gap-10">
        <h1 className="text-2xl font-bold text-center">Список дел на ReactJS</h1>
        <button onClick={() => handleLogout()} className="bg-rose-600 py-2 px-6 hover:bg-rose-700 rounded-lg">
          Выйти
        </button>
      </div>
      <div className="w-1/4 mx-auto">
        <CreateTodoInput />
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default Home;
