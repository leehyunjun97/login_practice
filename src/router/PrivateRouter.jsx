import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const PrivateRouter = () => {
  const id = localStorage.getItem('id');
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      alert('로그인을 해주세요');
      navigate('/signin');
    }
  }, [id, navigate]);

  return <Outlet />;
};

export default PrivateRouter;
