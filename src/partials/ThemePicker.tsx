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
   * Set theme and trigger update
   * @param name Name of theme
   */
  setTheme = (name: string) => {
    ThemeService.setTheme(name);
    this.forceUpdate();
  };

  /**
   * Map the themes to li elements and set click handler.
   */
  renderThemes = () =>
    ThemeService.getThemes().map((theme) => {
      return (
        <li
          key={theme.name}
          onClick={() => this.setTheme(theme.name)}
        >
          <button className="justify-between lowercase">
            <span
              className={
                ThemeService.getSelectedThemeName() === theme.name
                  ? 'italic underline'
                  : ''
              }
            >
              {theme.name}
            </span>{' '}
            <span>{theme.emoji}</span>
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
        <ul className="p-2 rounded shadow border-2 border-base-300/10 dropdown-content menu menu-compact bg-primary w-52">
          {/* Themes */}
          {this.renderThemes()}
        </ul>
      </div>
    );
  }
}

export default ThemePicker;
