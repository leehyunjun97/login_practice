import axios from 'axios';

export const postEmailCheck = async (email) => {
  try {
    const emailCheckCom = await axios.post(
      'http://localhost:5000/users/signup/emailCheck',
      {
        email,
      }
    );
    return emailCheckCom.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const postSignUp = async (email, password, nickName) => {
  try {
    const signCom = await axios.post('http://localhost:5000/users/signup', {
      email,
      password,
      nickName,
      profile: '',
    });
    return signCom.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const postSignIn = async (email, password) => {
  try {
    const loginCom = await axios.post('http://localhost:5000/users/login', {
      email,
      password,
    });
    return loginCom.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
