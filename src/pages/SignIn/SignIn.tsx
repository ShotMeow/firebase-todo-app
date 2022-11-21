import React, { FC, FormEvent, useState } from 'react';
import { useAuthContext } from '../../features/auth/AuthContextProvider';
import { useNavigate } from 'react-router-dom';

const SignIn: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();
  const { loginWithEmailAndPassword } = useAuthContext();
  const handleSubmit = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    loginWithEmailAndPassword(email, password)
      .then(() => navigate('/'))
      .catch(() => {
        setError('Неверный логин или пароль');
      });
  };
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Авторизация</h1>
      <form className="w-1/4 mx-auto flex flex-col gap-4">
        <label className="flex flex-col gap-2 w-full">
          E-mail
          <input
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            className="text-black py-2 px-4 rounded-lg"
          />
        </label>
        <label className="flex flex-col gap-2 w-full">
          Пароль
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            className="text-black py-2 px-4 rounded-lg"
          />
        </label>
        {error && <p className="text-red-600">{error}</p>}
        <button
          onClick={(event) => handleSubmit(event)}
          className="bg-rose-600 py-2 hover:bg-rose-700 rounded-lg"
          type="submit"
        >
          Авторизоваться
        </button>
      </form>
    </div>
  );
};

export default SignIn;
