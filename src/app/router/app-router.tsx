import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {AuthProvider, useAuth} from '../context/auth-context';
import { PrivateRoute } from './private-route';
import LoginPage from '../../ui/pages/login-page';
import HomePage from '../../ui/pages/home-page';

const AppRouter = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<HomePage />} />
          </Route>

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRouter;
