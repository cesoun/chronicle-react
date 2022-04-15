import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSwatchbook } from '@fortawesome/free-solid-svg-icons';
import ThemeService from '../services/ThemeService';

class ThemePicker extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
    ThemeService.init();
  }

  /**
   * Map the themes to li elements and set click handler.
   */
  renderThemes = ThemeService.getThemes().map((theme) => {
    return (
      <li
        key={theme.name}
        onClick={() => ThemeService.setTheme(theme.name)}
      >
        <button className="justify-between lowercase">
          {theme.name} <span>{theme.emoji}</span>
        </button>
      </li>
    );
  });

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
          {/* Themes */}
          {this.renderThemes}
        </ul>
      </div>
    );
  }
}

export default ThemePicker;
