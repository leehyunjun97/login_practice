import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../container/home/page/Home';
import SignUp from '../container/sign/SignUp';
import SignIn from '../container/sign/SignIn';

const PublicRouter = (props) => {
  useEffect(() => {}, []);
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='signin' element={<SignIn />} />
    </Routes>
  );
};

export default PublicRouter;
