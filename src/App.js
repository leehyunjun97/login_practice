import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header';
import Home from './container/home/page/Home';
import MyPage from './container/mypage/MyPage';
import SignUp from './container/sign/SignUp';
import SignIn from './container/sign/SignIn';
import PrivateRouter from './router/PrivateRouter';
import PublicRouter from './router/PublicRouter';

function App() {
  return (
    <div className='App'>
      <Header />
      <PublicRouter />

      <PrivateRouter />

      {/* <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<Home />} />

          <Route element={PrivateRouter}>
            <Route path='/mypage' element={<MyPage />} />
          </Route>

          <Route path='signup' element={<SignUp />} />
          <Route path='signin' element={<SignIn />} />
        </Route>
      </Routes> */}
    </div>
  );
}

export default App;
