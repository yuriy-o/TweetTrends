import ScrollToTopButton from 'components/ScrollToTopButton/ScrollToTopButton';
import { TweetsList } from 'components/TweetsList/TweetsList';

import styles from './tweets.module.css';

const Tweets = () => {
  return (
    <section className={styles.tweetsSection}>
      <TweetsList />
      <ScrollToTopButton />
    </section>
  );
};
export default Tweets;
