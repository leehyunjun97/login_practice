import React, { useState } from 'react';
import { postSignIn } from './sign';
import { useSetRecoilState } from 'recoil';
import { userInfo } from '../../recoil/user/user';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [loginInputState, setLoginInputState] = useState({
    email: '',
    password: '',
  });

  const setUser = useSetRecoilState(userInfo);
  const navigate = useNavigate();

  const changeInputHandler = (key, value) => {
    setLoginInputState((prev) => ({ ...prev, [key]: value }));
  };

  const login = async () => {
    try {
      const loginCom = await postSignIn(
        loginInputState.email,
        loginInputState.password
      );

      if (loginCom.success) {
        const { _id, email, nickName } = loginCom.user;
        localStorage.setItem('id', _id);

        setUser({ _id, email, nickName });

        navigate('/');
      }
    } catch (error) {
      console.log(error);
      alert('아이디, 비밀번호를 확인해주세요');
    }
  };
  return (
    <div className='SignIn'>
      <h2>Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className='loginBody'>
          <input
            placeholder='Email'
            type='email'
            value={loginInputState.email}
            onChange={(e) => changeInputHandler('email', e.target.value)}
          />
          <input
            placeholder='Password'
            name='password'
            type='password'
            value={loginInputState.password}
            onChange={(e) => changeInputHandler('password', e.target.value)}
          />
          <button className='login_btn' onClick={login} type='submit'>
            로그인
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
