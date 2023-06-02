import axios from 'axios';

export const getTweets = async () => {
  try {
    const response = await axios.get(
      'https://6478726a362560649a2dc983.mockapi.io/api/v1/users'
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
