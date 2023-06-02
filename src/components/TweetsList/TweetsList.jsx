import { useEffect, useState } from 'react';
import * as API from '../../utils/Api';
import photoNotFound from '../../utils/images/photo-not-found.jpg';
import clouds from '../../utils/images/clouds.png';
import goit from '../../utils/images/goit.png';
import styles from './tweestsList.module.css';
import { addComma } from '../../utils/addComma';

export const TweetsList = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('tweetsState'));

    if (savedState && savedState.length > 0) {
      setTweets(savedState);
    } else {
      API.getTweets().then(data => setTweets(data));
    }
  }, []);

  useEffect(() => {
    if (tweets.length > 0) {
      localStorage.setItem('tweetsState', JSON.stringify(tweets));
    }
  }, [tweets]);

  const handleFollowButtonClick = userId => {
    setTweets(prevTweets =>
      prevTweets.map(tweet => {
        if (tweet.id === userId) {
          const newFollowers =
            parseInt(tweet.followers, 10) + (tweet.isFollowing ? -1 : 1);

          return {
            ...tweet,
            isFollowing: !tweet.isFollowing,
            followers: newFollowers.toString(),
          };
        }
        return tweet;
      })
    );
  };

  return (
    <ul className={styles.tweetsList}>
      {tweets.map(({ id, user, tweets, followers, avatar, isFollowing }) => {
        const followersWithComma = addComma(followers);
        const followButtonText = isFollowing ? 'FOLLOWING' : 'FOLLOW';
        const followButtonClass = isFollowing
          ? styles.following
          : styles.follow;

        return (
          <li key={id} className={styles.item}>
            <div className={styles.topWrapper}>
              <img
                className={styles.clouds}
                src={clouds}
                alt="Clouds with a question mark and a progress bar"
                loading="lazy"
              />
              <img
                className={styles.goitLogo}
                src={goit}
                alt="The logo of GoIT company"
                loading="lazy"
              />
            </div>
            <div className={styles.separator}>
              <div className={styles.bagel}></div>
              <img
                className={styles.avatar}
                src={avatar ? avatar : photoNotFound}
                alt={user}
                title={user}
                loading="lazy"
              />
            </div>
            <div className={styles.downWrapper}>
              <p className={styles.tweets}>{`${tweets} TWEETS`}</p>
              <p
                className={styles.followers}
              >{`${followersWithComma} FOLLOWERS`}</p>
              <button
                className={`${styles.button} ${followButtonClass}`}
                onClick={() => handleFollowButtonClick(id)}
              >
                <p className={styles.followText}>{followButtonText}</p>
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
