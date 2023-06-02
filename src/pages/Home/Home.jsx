import styles from './home.module.css';

const Home = () => {
  return (
    <section className={styles.homeSection}>
      <h1 className={styles.title}>Tweet Trends</h1>
      <p className={styles.text}>
        TweetTrends is a fascinating app that provides users with access to a
        wide collection of tweets to analyze social trends and popular topics.
        It is an indispensable tool for sociologists, marketers, and anyone
        interested in social media and its impact on society.
      </p>
      <p className={styles.text}>
        One of the most important advantages of TweetTrends is its large
        collection of tweets from different countries. Users have the
        opportunity to explore social habits and sentiments in different
        cultures, making this app a valuable resource for learning about global
        social trends. With TweetTrends, you can easily track and analyze hot
        topics and discussions, which is important for understanding current
        events and public sentiment.
      </p>
      <p className={styles.text}>
        One of the app's strengths is its intuitive and user-friendly interface.
        Users can easily navigate between tweets using various filters and
        sorting options. Search functions allow you to find specific topics or
        users, which simplifies the process of finding and analyzing the
        information you need.
      </p>
      <p className={styles.text}>
        TweetTrends also impresses with its functionality and features. Users
        can track the number of tweets, count the number of followers, and
        access user profiles, which allows them to explore information in depth
        and draw interesting conclusions.
      </p>
    </section>
  );
};

export default Home;
