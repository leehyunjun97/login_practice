import React, { useEffect } from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import MyPage from '../container/mypage/MyPage';

const PrivateRouter = (props) => {
  const id = localStorage.getItem('id');
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      alert('로그인을 해주세요');
      navigate('/signin');
    }
  }, [id]);

  return <Outlet />;
};

export default PrivateRouter;
