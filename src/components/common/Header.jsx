import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Header = (props) => {
  const id = localStorage.getItem('id');

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
              <button>내 정보</button>
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
