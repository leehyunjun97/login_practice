import React, { useRef, useState } from 'react';
import { postEmailCheck, postSignUp } from './sign';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userInfo } from '../../recoil/user/user';

const SignUp = (props) => {
  const [signUpInputState, setSignUpInputState] = useState({
    email: '',
    password: '',
    nickName: '',
  });

  const setUser = useSetRecoilState(userInfo);

  const [isEmailCheck, setIsEmailCheck] = useState(false);
  const [isEmailRegExp, setIsEmailRegExp] = useState(true);

  const emailRef = useRef();
  const navigate = useNavigate();

  const changeInputHandler = (value, key) => {
    setSignUpInputState((prev) => ({ ...prev, [key]: value }));
  };

  const checkEmail = (e) => {
    const regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,}$/i;

    // 형식에 맞는 경우 true 리턴

    if (!regExp.test(e.target.value)) {
      console.log('이메일 유효성 불합격 :: ', regExp.test(e.target.value));
      setIsEmailRegExp(regExp.test(e.target.value));
    } else {
      console.log('이메일 유효성 합격 :: ', regExp.test(e.target.value));
      setIsEmailRegExp(regExp.test(e.target.value));
    }
  };

  const emailCheck = async () => {
    try {
      const emailCheckCom = await postEmailCheck(signUpInputState.email);

      if (emailCheckCom.success) {
        alert('사용 가능한 이메일 입니다.');
        setIsEmailCheck(true);
      }
    } catch (error) {
      emailRef.current.focus();
      setIsEmailCheck(false);
      alert(error.message);
    }
  };

  const signUp = async () => {
    try {
      const signCom = await postSignUp(
        signUpInputState.email,
        signUpInputState.password,
        signUpInputState.nickName
      );

      if (signCom.success) {
        alert('회원가입이 되었습니다.');
        const { _id, email, nickName } = signCom.user;
        localStorage.setItem('id', _id);

        setUser({ _id, email, nickName });

        navigate('/');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='SignUp'>
      <h2>Sign Up</h2>
      <div className='signBody'>
        <input
          className='email_input'
          type='email'
          onBlur={checkEmail}
          placeholder='example@naver.com'
          ref={emailRef}
          name='email'
          value={signUpInputState.email}
          onChange={(e) => changeInputHandler(e.target.value, 'email')}
        />

        <button
          className='emailCheck_btn'
          onClick={(e) => {
            if (!isEmailRegExp) {
              alert('이메일 형식을 확인해주세요');
              emailRef.current.focus();
              return;
            } else {
              emailCheck();
            }
          }}
        >
          중복체크
        </button>
        <input
          placeholder='password ( 6자 이상 )'
          type='password'
          name='password'
          value={signUpInputState.password}
          onChange={(e) => changeInputHandler(e.target.value, 'password')}
        />
        <input
          placeholder='nickName'
          name='nickName'
          value={signUpInputState.nickName}
          onChange={(e) => changeInputHandler(e.target.value, 'nickName')}
        />
        <div className='emailRegExp'>
          {!isEmailRegExp && <p>이메일 형식을 확인해 주세요</p>}
        </div>
        <button
          className='signUp_btn'
          onClick={(e) => {
            if (signUpInputState.password.length < 6) {
              alert('패스워드는 6글자 이상 입력해주세요');
              return;
            } else if (signUpInputState.nickName.length < 6) {
              alert('닉네임은 6글자 이상 입력해주세요');
              return;
            } else if (!isEmailCheck) {
              alert('이메일 중복 체크를 해주세요');
              return;
            } else {
              signUp();
            }
          }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default SignUp;
