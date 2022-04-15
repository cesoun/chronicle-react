export interface Theme {
  name: string;
  emoji: string;
}

export const themes = {
  light: {
    name: 'light',
    emoji: '🌝',
  },
  dark: {
    name: 'dark',
    emoji: '🌚',
  },
  business: {
    name: 'business',
    emoji: '💼',
  },
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
