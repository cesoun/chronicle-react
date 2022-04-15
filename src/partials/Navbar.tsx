import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faCircleXmark,
  faGear,
  faPlus,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import ThemePicker from './ThemePicker';
import { UserContext } from '../contexts/UserContext';
import UseAuth from '../hooks/UseAuth';

function Navbar() {
  const { user, isLoading } = useContext(UserContext);
  const { logoutUser } = UseAuth();

  if (isLoading) {
    return <p className="btn btn-ghost loading"></p>;
  }

  return (
    <nav className="navbar bg-primary text-primary-content sticky top-0 font-mono">
      {/* Left */}
      <div className="flex-1">
        <div className="dropdown dropdown-hover">
          <Link
            to={'/'}
            tabIndex={0}
            className="btn btn-ghost normal-case text-xl"
          >
            Chronicle
          </Link>

          <ul className="p-2 rounded shadow border-2 border-base-300/10 dropdown-content menu menu-compact bg-primary w-52">
            <li>
              <Link
                to={'/'}
                className="justify-start"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={'/posts'}
                className="justify-start"
              >
                Posts
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-none gap-2 pr-2">
        {/*  Theme Picker */}
        <ThemePicker />

        {!user && (
          <>
            {/* No User, SignUp + Login */}
            <div>
              <div className="hidden md:flex">
                <Link
                  to={'/signup'}
                  className="btn btn-ghost"
                >
                  Sign-Up
                </Link>
                <Link
                  to={'/login'}
                  className="btn btn-ghost"
                >
                  Login
                </Link>
              </div>
            </div>

            {/* Collapse */}
            <div className="dropdown dropdown-hover dropdown-end md:hidden">
              <label
                htmlFor="no-user-collapse"
                tabIndex={0}
                className="btn btn-ghost"
              >
                <FontAwesomeIcon icon={faBars} />
              </label>

              {/* Dropdown */}
              <ul className="p-2 rounded shadow border-2 border-base-300/10 dropdown-content menu menu-compact bg-primary w-52">
                <li>
                  <Link
                    to={'/signup'}
                    className="justify-start"
                  >
                    Sign-Up
                  </Link>
                  <Link
                    to={'/login'}
                    className="justify-start"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>

      {user && (
        <>
          {/*  New Post Button */}
          <div
            className="tooltip tooltip-bottom"
            data-tip={'new post'}
          >
            <Link
              to={'/post/new'}
              className="btn btn-ghost"
            >
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          </div>

          {/*  Profile Menu if User */}
          <div className="dropdown dropdown-hover dropdown-end">
            <label
              htmlFor="user-collapse"
              tabIndex={0}
              className="btn btn-ghost"
            >
              <FontAwesomeIcon icon={faUser} />
            </label>

            {/* Dropdown */}
            <ul className="p-2 rounded shadow border-2 border-base-300/10 menu menu-compact dropdown-content bg-primary w-52">
              <li>
                <Link
                  to={`/profile/${user?.sub}`}
                  className="justify-between"
                >
                  Profile
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              </li>
              <li>
                <Link
                  to={`profile/${user?.sub}/edit`}
                  className="justify-between"
                >
                  Settings
                  <FontAwesomeIcon icon={faGear} />
                </Link>
              </li>
              <li>
                <button
                  className="justify-between"
                  onClick={logoutUser}
                >
                  Logout
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
