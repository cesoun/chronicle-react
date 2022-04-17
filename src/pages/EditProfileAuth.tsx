import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Navigate, useParams } from 'react-router-dom';
import EditProfile from './EditProfile';

function EditProfileAuth() {
  const { user, isLoading } = useContext(UserContext);
  const { username } = useParams();

  if (!user) {
    if (isLoading) {
      return <p className="btn btn-ghost loading">Loading Context...</p>;
    }

    return <Navigate to={'/login'} />;
  }

  if (user.sub !== username) {
    return <Navigate to={'/login'} />;
  }

  return <EditProfile />;
}

export default EditProfileAuth;
