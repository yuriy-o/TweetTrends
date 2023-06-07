import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillFilter } from 'react-icons/ai';

import * as API from '../../utils/Api';
import { addComma } from '../../utils/addComma';

import photoNotFound from '../../utils/images/photo-not-found.jpg';
import clouds from '../../utils/images/clouds.png';
import goit from '../../utils/images/goit.png';

import styles from './tweestsList.module.css';

export const TweetsList = React.memo(() => {
  const [tweets, setTweets] = useState([]);
  const [filter, setFilter] = useState('show all'); // filter
  const [currentPage, setCurrentPage] = useState(1);
  const tweetsPerPage = 6;

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

  const filteredTweets = applyFilter(tweets, filter);

  function applyFilter(tweets, filter) {
    if (filter === 'show all') {
      return tweets;
    } else if (filter === 'follow') {
      return tweets.filter(tweet => !tweet.isFollowing);
    } else if (filter === 'followings') {
      return tweets.filter(tweet => tweet.isFollowing);
    }
    return tweets;
  }

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  // Pagination
  const indexOfLastTweet = currentPage * tweetsPerPage;
  const indexOfFirstTweet = indexOfLastTweet - tweetsPerPage;
  const currentTweets = filteredTweets.slice(
    indexOfFirstTweet,
    indexOfLastTweet
  );

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <div className={styles.linkWrap}>
        <Link to="/" className={styles.goBackLink}>
          &lt; Go Back
        </Link>
        <div className={styles.filterContainer}>
          <label htmlFor="filter">
            <AiFillFilter className={styles.iconFilter} />
          </label>
          <select id="filter" value={filter} onChange={handleFilterChange}>
            <option value="show all">Show All</option>
            <option value="follow">Follow</option>
            <option value="followings">Followings</option>
          </select>
        </div>
      </div>

      <ul className={styles.tweetsList}>
        {currentTweets.map(
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

      {filteredTweets.length > tweetsPerPage && (
        <div className={styles.pagination}>
          {Array.from(
            { length: Math.ceil(filteredTweets.length / tweetsPerPage) },
            (_, index) => (
              <button
                key={index}
                className={
                  index + 1 === currentPage ? styles.activePage : styles.page
                }
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      )}
    </>
  );
});
