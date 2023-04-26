import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userInfo } from '../../../recoil/user/user';

const Home = (props) => {
  const [userInfoData, setUserInfo] = useRecoilState(userInfo);
  const id = localStorage.getItem('id');

  return (
    <div className='Home'>
      {id ? <>{userInfoData.nickName} 님 안녕하세요</> : <>로그인해줘잉</>}
    </div>
  );
};

export default Home;