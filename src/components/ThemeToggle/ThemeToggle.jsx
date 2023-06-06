import React, { useState, useEffect } from 'react';
import styles from './themeToggle.module.css';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
    // setIsDarkMode(savedTheme === 'dark');
  }, []);

  // Встановлюємо відповідний колір фону в залежності від значення isDarkMode
  useEffect(() => {
    const rootElement = document.documentElement;
    const accentColor =
      getComputedStyle(rootElement).getPropertyValue('--accent-color');
    const secondaryColor =
      getComputedStyle(rootElement).getPropertyValue('--secondary-color');

    // Задаємо колір фону
    const themeBackgroundColor = isDarkMode
      ? 'var(--dark-theme-background-color)'
      : secondaryColor;
    document.body.style.backgroundColor = themeBackgroundColor;

    rootElement.style.setProperty(
      '--accent-color-theme',
      isDarkMode ? secondaryColor : accentColor
    );
    rootElement.style.setProperty(
      '--secondary-color-theme',
      isDarkMode ? accentColor : secondaryColor
    );

    // Зберігаємо значення теми в локальному сховищі
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div onClick={toggleTheme}>
      {isDarkMode ? (
        <FaSun className={styles.themeIcons} />
      ) : (
        <FaMoon className={styles.themeIcons} />
      )}
    </div>
  );
};

export default ThemeToggle;
