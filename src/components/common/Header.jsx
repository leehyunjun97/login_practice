import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { userInfo } from '../../recoil/user/user';
import axios from 'axios';

const Header = () => {
  const setUserInfo = useSetRecoilState(userInfo);
  const userInfoReset = useResetRecoilState(userInfo);
  const id = localStorage.getItem('id');

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const myProfile = async () => {
        try {
          const profileCom = await axios.get(
            `http://localhost:5000/users/my?id=${id}`
          );
          const { _id, email, nickName } = profileCom.data.user;

          setUserInfo({ _id, email, nickName });
        } catch (error) {
          console.log(error.response.data.message);
          alert('유저를 찾을 수 없습니다.');
          localStorage.removeItem('id');
          navigate('/');
        }
      };
      myProfile();
    }
  }, [id, setUserInfo, navigate]);

  const logout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      localStorage.removeItem('id');
      userInfoReset();
      navigate('/');
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
          <button>
            <Link
              to='/post'
              className='links'
              style={{ textDecoration: 'none', color: 'black' }}
            >
              포스트
            </Link>
          </button>
          {id ? (
            <>
              <button>
                <Link
                  to='/user/mypage'
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
