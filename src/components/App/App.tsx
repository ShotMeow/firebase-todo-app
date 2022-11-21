import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from '../../pages/SignIn/SignIn';
import Home from '../../pages/Home/Home';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import { AuthContextProvider } from '../../features/auth/AuthContextProvider';
import { initializeAPI } from '../../api/api';

const firebaseApp = initializeAPI();

const App: FC = () => {
  return (
    <main className="py-10 text-white">
      <AuthContextProvider firebaseApp={firebaseApp}>
        <BrowserRouter>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </main>
  );
};

export default App;
