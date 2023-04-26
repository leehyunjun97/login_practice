import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfo } from '../../../recoil/user/user';
import axios from 'axios';

const Home = (props) => {
  const [userInfoData, setUserInfo] = useRecoilState(userInfo);
  const id = localStorage.getItem('id');

  useEffect(() => {
    const myProfile = async () => {
      try {
        const profileCom = await axios.get(
          `http://localhost:5000/users/my?id=${id}`
        );
        console.log(profileCom.data.user);
        const { _id, email, nickName } = profileCom.data.user;

        setUserInfo({ _id, email, nickName });
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    myProfile();
  }, [id]);
  return (
    <div className='Home'>
      {id ? <>{userInfoData.nickName} 님 안녕하세요</> : <>로그인해줘잉</>}
    </div>
  );
};

export default Home;
