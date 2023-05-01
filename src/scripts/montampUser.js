import axios from 'axios';

export const getUser = async (id) => {
  try {
    const findUserCom = await axios.get(
      `http://localhost:5000/users/my?id=${id}`
    );
    return findUserCom.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
