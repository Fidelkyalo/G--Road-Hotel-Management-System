import { Dispatch, SetStateAction, createContext } from 'react';

/**
 * Type definition for ThemeContext.
 */
type ThemeContextType = {
  darkTheme: boolean;
  setDarkTheme: Dispatch<SetStateAction<boolean>>;
};

/**
 * Context for managing the application's theme (dark/light).
 */
const ThemeContext = createContext<ThemeContextType>({
  darkTheme: true,
  setDarkTheme: () => null,
});

export default ThemeContext;
