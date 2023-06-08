import { Outlet } from 'react-router-dom';
import { AiTwotoneHome, AiOutlineTwitter } from 'react-icons/ai';

import ThemeToggle from 'components/ThemeToggle/ThemeToggle';
import styles from './header.module.css';

export const SharedLayout = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.menuWrap}>
            <a href="/TweetTrends/" className={styles.menuLink}>
              <AiTwotoneHome className={styles.iconHome} />
              Home
            </a>
            <a href="/TweetTrends/tweets" className={styles.menuLink}>
              <AiOutlineTwitter className={styles.iconTweet} />
              Tweets
            </a>
          </div>
          <div className={styles.themeToggleContainer}>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
