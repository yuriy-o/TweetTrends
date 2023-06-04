import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

import * as API from '../../utils/Api';
import { addComma } from '../../utils/addComma';

import photoNotFound from '../../utils/images/photo-not-found.jpg';
import clouds from '../../utils/images/clouds.png';
import goit from '../../utils/images/goit.png';

import styles from './tweestsList.module.css';

export const TweetsList = React.memo(() => {
  const [tweets, setTweets] = useState([]);
  const [loadedTweets, setLoadedTweets] = useState([]);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('show all');

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
      const filteredTweets = applyFilter(tweets, filter);
      setLoadedTweets(filteredTweets.slice(0, 3)); // Завантажуємо перші 3 дані
      setLoadMoreVisible(filteredTweets.length > 3);
    }
  }, [tweets, filter]);

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

    // Оновити loadedTweets після зміни tweets
    const filteredTweets = applyFilter(tweets, filter);
    setLoadedTweets(filteredTweets.slice(0, 3));
    setLoadMoreVisible(filteredTweets.length > 3);
  };

  const handleLoadMore = () => {
    setLoading(true); // Показуємо спіннер

    const startIndex = loadedTweets.length;
    const endIndex = startIndex + 3;
    const newLoadedTweets = [
      ...loadedTweets,
      ...tweets.slice(startIndex, endIndex),
    ];

    setLoadedTweets(newLoadedTweets);

    if (endIndex >= tweets.length) {
      setLoadMoreVisible(false); // Приховуємо кнопку "Load More", якщо всі дані завантажено
    }

    setLoading(false); // Ховаємо спіннер та показуємо кнопку "Load More"
  };

  const applyFilter = (tweets, filter) => {
    if (filter === 'show all') {
      return tweets;
    } else if (filter === 'follow') {
      return tweets.filter(tweet => tweet.follow);
    } else if (filter === 'followings') {
      return tweets.filter(tweet => tweet.following);
    }
    return tweets;
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  return (
    <>
      <div className={styles.linkWrap}>
        <Link to="/" className={styles.goBackLink}>
          &lt; Go Back
        </Link>

        <select value={filter} onChange={handleFilterChange}>
          <option value="show all">Show All</option>
          <option value="follow">Follow</option>
          <option value="followings">Followings</option>
        </select>
      </div>

      <ul className={styles.tweetsList}>
        {loadedTweets.map(
          ({ id, user, tweets, followers, avatar, isFollowing }) => {
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
          }
        )}
      </ul>
      {loadMoreVisible && (
        <button className={styles.loadMoreButton} onClick={handleLoadMore}>
          {loading ? <FadeLoader size={10} color="#502f9d" /> : 'Load More'}
        </button>
      )}
    </>
  );
});
