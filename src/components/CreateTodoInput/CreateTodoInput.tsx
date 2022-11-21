import React, { FC, useState } from 'react';
import { addTodoToUserCollection } from '../../api/api';
import { useAuthContext } from '../../features/auth/AuthContextProvider';

const CreateTodoInput: FC = () => {
  const [task, setTask] = useState<string>('');
  const { user } = useAuthContext();
  const handleAppend = () => {
    if (task) {
      addTodoToUserCollection(user.reloadUserInfo.localId, task);
      setTask('');
    }
  };
  return (
    <label className="block my-4">
      <input
        type="text"
        onChange={(event) => setTask(event.target.value)}
        onKeyPress={(event) => event.key === 'Enter' && handleAppend()}
        value={task}
        className="rounded-lg px-4 py-2 text-black w-full"
        placeholder="Введите новое занятие"
      />
    </label>
  );
};

export default CreateTodoInput;
