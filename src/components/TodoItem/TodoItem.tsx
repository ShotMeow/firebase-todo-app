import React, { FC, useEffect, useRef, useState } from 'react';
import { ITodo } from '../../api/types';
import { removeTodoFromUserCollection, updateTodoFromUserCollection } from '../../api/api';
import { useAuthContext } from '../../features/auth/AuthContextProvider';
import { BsInputCursorText, BsTrash, BsCheck } from 'react-icons/bs';

interface Props {
  todo: ITodo;
}

const TodoItem: FC<Props> = ({ todo }) => {
  const [deleting, setDeleting] = useState<boolean>(false);
  const [isInput, setIsInput] = useState<boolean>(false);
  const [value, setValue] = useState<string>(todo.name);
  const { user } = useAuthContext();

  const ref = useRef<HTMLInputElement>(null);

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => {
      removeTodoFromUserCollection(user.reloadUserInfo.localId, todo.id).then(() => setDeleting(false));
    }, 2000);
  };

  const handleInput = () => {
    setIsInput((prev) => !prev);
  };

  const handleUpdate = () => {
    updateTodoFromUserCollection(user.reloadUserInfo.localId, todo.id, value).then(() => setIsInput((prev) => !prev));
  };

  useEffect(() => {
    if (ref && ref.current && isInput) {
      ref.current.focus();
    }
  }, [isInput]);

  return (
    <div className={`flex items-center gap-4 mb-4 ${deleting ? 'animate-fadeOut' : ''}`}>
      <input
        type="text"
        ref={ref}
        disabled={!isInput}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="cursor-pointer flex items-center justify-between bg-zinc-800 p-5 rounded-lg w-full"
      />
      {isInput ? (
        <button onClick={() => handleUpdate()}>
          <BsCheck size={24} />
        </button>
      ) : (
        <button onClick={() => handleInput()}>
          <BsInputCursorText size={24} />
        </button>
      )}
      <button onClick={() => handleDelete()}>
        <BsTrash size={24} />
      </button>
    </div>
  );
};

export default TodoItem;
