import React from 'react';
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

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar bg-base-100 shadow sticky top-0">
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

            <ul className="p-2 shadow border-2 border-base-200/25 dropdown-content menu menu-compact bg-base-100 w-52">
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

          {/*  No User SignUp/Login + Collapse */}
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
            <ul className="p-2 shadow border-2 border-base-200/25 dropdown-content menu menu-compact bg-base-100 w-52">
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
        </div>

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
          <ul className="p-2 shadow border-2 border-base-200/25 menu menu-compact dropdown-content bg-base-100 w-52">
            <li>
              <Link
                to={'/profile/:id'}
                className="justify-between"
              >
                Profile
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </li>
            <li>
              <Link
                to={'profile/:id/edit'}
                className="justify-between"
              >
                Settings
                <FontAwesomeIcon icon={faGear} />
              </Link>
            </li>
            <li>
              <Link
                to={'#logout'}
                className="justify-between"
              >
                Logout
                <FontAwesomeIcon icon={faCircleXmark} />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
