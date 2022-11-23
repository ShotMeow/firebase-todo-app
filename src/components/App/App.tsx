import React, { FC } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import SignIn from '../../pages/SignIn/SignIn';
import Home from '../../pages/Home/Home';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import { AuthContextProvider } from '../../features/auth/AuthContextProvider';
import { initializeAPI } from '../../api/api';
import SignUp from '../../pages/SignUp/SignUp';

const firebaseApp = initializeAPI();

const App: FC = () => {
  return (
    <main className="py-10 text-white">
      <AuthContextProvider firebaseApp={firebaseApp}>
        <HashRouter>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </HashRouter>
      </AuthContextProvider>
    </main>
  );
};

export default App;
