import React, { useState, useEffect } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';

import styles from './scrollToTopButton.module.css';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`${styles.scrollToTopButton} ${
          isVisible ? styles.visible : ''
        }`}
      >
        <button onClick={scrollToTop}>
          <AiOutlineArrowUp className={styles.iconArrowUp} />
        </button>
      </div>
    </>
  );
};

export default ScrollToTopButton;
