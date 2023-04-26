import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header';
import Home from './container/home/page/Home';
import MyPage from './container/mypage/MyPage';
import SignUp from './container/sign/SignUp';
import SignIn from './container/sign/SignIn';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<Home />} />
          <Route path='mypage' element={<MyPage />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='signin' element={<SignIn />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
