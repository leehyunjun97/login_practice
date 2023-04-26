import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userInfo } from '../../recoil/user/user';
import axios from 'axios';

const Header = (props) => {
  const [userInfoData, setUserInfo] = useRecoilState(userInfo);

  const id = localStorage.getItem('id');

  useEffect(() => {
    if (id) {
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
    }
  }, [id]);

  const logout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      localStorage.removeItem('id');
      window.location.replace('/');
    }
  };
  return (
    <div>
      <div className='Header'>
        <h2 className='main'>
          <Link
            to='/'
            className='links'
            style={{ textDecoration: 'none', color: 'black' }}
          >
            MONSTAMP
          </Link>
        </h2>
        <div className='signDiv'>
          {id ? (
            <>
              <button>
                <Link
                  to='/mypage'
                  className='links'
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  내 정보
                </Link>
              </button>
              <button
                onClick={(e) => {
                  logout();
                }}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button>
                <Link
                  to='/signin'
                  className='links'
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  로그인
                </Link>
              </button>
              <button>
                <Link
                  to='/signup'
                  className='links'
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  회원가입
                </Link>
              </button>
            </>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Header;
