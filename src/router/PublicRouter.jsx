import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const PublicRouter = () => {
  const id = localStorage.getItem('id');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      navigate('/');
    }
  }, [id, navigate]);
  return <Outlet />;
};

export default PublicRouter;
