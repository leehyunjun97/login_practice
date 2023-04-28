import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const PublicRouter = (props) => {
  const id = localStorage.getItem('id');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      navigate('/');
    }
  }, [id]);
  return <Outlet />;
};

export default PublicRouter;
