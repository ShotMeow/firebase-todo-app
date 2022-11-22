import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp: FC = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Регистрация</h1>
      <form className="w-1/4 mx-auto flex flex-col gap-4">
        <label className="flex flex-col gap-2 w-full">
          E-mail
          <input type="email" className="text-black py-2 px-4 rounded-lg" />
        </label>
        <label className="flex flex-col gap-2 w-full">
          Пароль
          <input type="password" className="text-black py-2 px-4 rounded-lg" />
        </label>
        <button className="bg-rose-600 py-2 transition-all hover:bg-rose-700 rounded-lg" type="submit">
          Зарегистрироваться
        </button>
        <button
          onClick={() => handleSignIn()}
          type="button"
          className="bg-gray-800 transition-all py-2 hover:bg-gray-700 rounded-lg"
        >
          Авторизоваться
        </button>
      </form>
    </div>
  );
};

export default SignUp;
