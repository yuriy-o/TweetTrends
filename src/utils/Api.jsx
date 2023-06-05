import axios from 'axios';

export const getTweets = async () => {
  try {
    //? How to upload data from .env to GitHub?
    // const response = await axios.get(process.env.REACT_APP_BASE_URL);

    const response = await axios.get(
      'https://6478726a362560649a2dc983.mockapi.io/api/v1/users'
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
