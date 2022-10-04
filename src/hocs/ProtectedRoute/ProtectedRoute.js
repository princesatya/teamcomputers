import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Navigate, Outlet } from 'react-router-dom'

const useAuth = () => {
  const user = localStorage.getItem('user')
  if (user) {
    return true
  } else {
    return false
  }
}

const ProtectedRoutes = () => {
  const { token } = useSelector((state) => state.login);
  return token ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes;  