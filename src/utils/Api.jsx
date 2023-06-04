import axios from 'axios';

export const getTweets = async () => {
  try {
    const response = await axios.get(process.env.REACT_APP_BASE_URL);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
