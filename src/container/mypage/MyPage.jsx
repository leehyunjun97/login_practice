import React from 'react';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../recoil/user/user';

const MyPage = (props) => {
  const value = useRecoilValue(userInfo);

  console.log(value);
  return <div className='MyPage'>MYPAGE</div>;
};

export default MyPage;
