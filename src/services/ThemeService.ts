export interface Theme {
  name: string;
  emoji: string;
}

/*
      'light',
      'dark',
      'corporate',
      'garden',
      'forest',
      'lofi',
      'pastel',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'night',
      'coffee',
      'winter',
 */

export const themes = {
  light: { name: 'light', emoji: '🌝' },
  dark: { name: 'dark', emoji: '🌚' },
  corporate: { name: 'corporate', emoji: '🏢' },
  forest: { name: 'forest', emoji: '🌲' },
  lofi: { name: 'lofi', emoji: '👓' },
  dracula: { name: 'dracula', emoji: '🧛🏻‍♂️' },
  cmyk: { name: 'cmyk', emoji: '🖨' },
  autumn: { name: 'autumn', emoji: '🍁' },
  business: { name: 'business', emoji: '💼' },
  night: { name: 'night', emoji: '🌙' },
  coffee: { name: 'coffee', emoji: '☕️' },
  winter: { name: 'winter', emoji: '❄️' },
};

class ThemeService {
  /**
   * Get and set the theme.
   */
  init() {
    let theme = this.getSelectedThemeName();
    this.setTheme(theme);
  }

  /**
   * Get all themes
   */
  getThemes(): Theme[] {
    return Object.values(themes);
  }

  /**
   * Get the currently selected theme.
   */
  getSelectedThemeName(): string {
    let theme = localStorage.getItem('theme');

    if (!theme) {
      this.setTheme(themes.light.name);
      theme = themes.light.name;
    }

    return theme;
  }

  /**
   * Set the current theme
   * @param name theme to select, light if not found.
   */
  setTheme(name: string): void {
    let existingTheme = this.getThemes().find((theme) => theme.name === name);
    if (!existingTheme) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', name);
    }

    let theme = this.getSelectedThemeName();

    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
  }
}

export default new ThemeService();
