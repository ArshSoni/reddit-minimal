import React from 'react';

const fetchReddit = subreddit => {
  const url = `https://www.reddit.com/r/${subreddit || ''}/.json`;
  return fetch(url).then(res => res.json());
}

export {
  fetchReddit
}