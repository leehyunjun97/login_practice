import axios from 'axios';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { postList } from '../../recoil/post/post';
import PostItem from './PostItem';
import { useNavigate } from 'react-router-dom';
import { userInfo } from '../../recoil/user/user';

const MainPost = () => {
  const [postListState, setPostListState] = useRecoilState(postList);
  const userInfoData = useRecoilValue(userInfo);
  const navigate = useNavigate();
  useEffect(() => {
    const getPostList = async () => {
      try {
        const getPostCom = await axios.get('http://localhost:5000/post');
        setPostListState(getPostCom.data.postItem);
      } catch (error) {
        console.log(error);
      }
    };
    getPostList();
  }, [setPostListState]);

  console.log(userInfoData);

  return (
    <div className='MainPost'>
      {userInfoData._id
        ? postListState.map((it) => <PostItem key={it._id} {...it} />)
        : postListState
            .filter((it) => it.sharePost === 'true')
            .map((it) => <PostItem key={it._id} {...it} />)}
      {userInfoData._id && (
        <div className='edit_post_section'>
          <button
            onClick={() => {
              navigate('edit');
            }}
          >
            포스트 작성하기
          </button>
        </div>
      )}
    </div>
  );
};

export default MainPost;
