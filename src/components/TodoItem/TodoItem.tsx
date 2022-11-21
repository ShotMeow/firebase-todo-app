import React, { FC, useState } from 'react';
import { ITodo } from '../../api/types';
import { removeTodoFromUserCollection } from '../../api/api';
import { useAuthContext } from '../../features/auth/AuthContextProvider';

interface Props {
  todo: ITodo;
}

const TodoItem: FC<Props> = ({ todo }) => {
  const [deleting, setDeleting] = useState<boolean>(false);
  const { user } = useAuthContext();

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => {
      removeTodoFromUserCollection(user.reloadUserInfo.localId, todo.id).then(() => setDeleting(false));
    }, 2000);
  };

  return (
    <div
      onClick={() => handleDelete()}
      className={`cursor-pointer flex items-center justify-between bg-zinc-800 p-5 mb-4 rounded-lg w-full ${
        deleting ? 'animate-fade-out' : 'animate-fade-in'
      }`}
    >
      {todo.name}
    </div>
  );
};

export default TodoItem;
