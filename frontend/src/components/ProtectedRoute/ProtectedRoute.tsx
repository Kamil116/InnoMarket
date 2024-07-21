import React from 'react';
import { Navigate } from 'react-router-dom';

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  children: JSX.Element;
};

export default function ProtectedRoute({
  isAuthenticated,
  children
}: ProtectedRouteProps) {
  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to={{ pathname: '/login' }} />;
  }
}
