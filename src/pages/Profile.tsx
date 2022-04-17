import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { User } from '../interfaces/models/UserModels';
import UserService from '../services/UserService';
import ErrorModel, {
  InstanceOfErrorModel,
} from '../interfaces/models/ErrorModel';

function Profile() {
  const { user, isLoading } = useContext(UserContext);
  const { username } = useParams();

  let navigate = useNavigate();

  const [dbUser, setDbUser] = useState<null | User>(null);
  const [error, setError] = useState<null | ErrorModel>(null);

  useEffect(() => {
    getUserByUsername(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserByUsername = async (username: string | undefined) => {
    if (!username) {
      return navigate('/');
    }

    const res = await UserService.getUserByUsername(username);
    if (InstanceOfErrorModel(res)) {
      setError(res as ErrorModel);
    } else {
      setDbUser(res as User);
    }
  };

  const renderName = () => {
    if (!dbUser) return <li>Unknown.</li>;

    const { first_name, last_name } = dbUser;

    if (first_name && last_name) {
      return (
        <li>
          Full Name: {first_name} {last_name}
        </li>
      );
    } else if (first_name) {
      return <li>First Name: {first_name}</li>;
    } else if (last_name) {
      return <li>Last Name: {last_name}</li>;
    }
  };

  if (!dbUser) {
    if (error) {
      return <Navigate to="/" />;
    }

    if (isLoading) {
      return <p className="btn btn-ghost loading">Loading Context...</p>;
    }

    return <p className="btn btn-ghost loading">Loading User...</p>;
  }

  return (
    <div className="flex flex-col min-w-full md:w-3/4">
      {/* Header */}
      <article className="prose max-w-full prose-ul:list-none prose-ul:p-0 prose-a:no-underline text-center">
        <h1 className="text-3xl">{dbUser.username}</h1>
        <ul className="text-sm text-secondary">
          <li>id: {dbUser.id}</li>
          <li>role: {dbUser.role}</li>
          {renderName()}
        </ul>
      </article>

      {/* Edit User Button */}
      {user?.sub === dbUser.username && (
        <div className="flex justify-center">
          <Link
            to={`/profile/${user?.sub}/edit`}
            className="btn btn-sm btn-ghost"
          >
            Edit
          </Link>
        </div>
      )}

      {/* Divider */}
      <div className="pt-2 max-w-3/4">
        <h1>Recent Posts</h1>
        <hr className="border-primary" />
      </div>

      {/* Recent Posts Component */}
    </div>
  );
}

export default Profile;
