import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSwatchbook } from '@fortawesome/free-solid-svg-icons';

class ThemePicker extends React.Component {
  render() {
    return (
      <div className="dropdown dropdown-hover dropdown-end">
        <label
          htmlFor="theme-picker"
          className="btn btn-ghost"
        >
          <FontAwesomeIcon icon={faSwatchbook} />
        </label>

        {/* Dropdown */}
        <ul className="p-2 shadow border-2 border-base-200/25 dropdown-content menu menu-compact bg-base-100 w-52">
          {/*    Render Each Theme Out */}
          <li>
            <button className="justify-between lowercase">
              Light <span>🌝</span>
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default ThemePicker;
