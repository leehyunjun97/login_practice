import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header';
import Home from './container/home/page/Home';
import MyPage from './container/mypage/MyPage';
import SignUp from './container/sign/SignUp';
import SignIn from './container/sign/SignIn';
import PrivateRouter from './router/PrivateRouter';
import PublicRouter from './router/PublicRouter';
import MainPost from './container/post/MainPost';
import PostEditor from './container/post/PostEditor';
import PostDetail from './container/post/PostDetail';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<Home />} />

          <Route path='/' element={<PrivateRouter />}>
            <Route path='user/mypage' element={<MyPage />} />
            <Route path='post/edit' element={<PostEditor />} />
          </Route>

          <Route path='/' element={<PublicRouter />}>
            <Route path='signup' element={<SignUp />} />
            <Route path='signin' element={<SignIn />} />
          </Route>

          <Route path='post' element={<MainPost />} />
          <Route path='post/detail/:id' element={<PostDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
