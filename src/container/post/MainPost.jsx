import axios from 'axios';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { postList } from '../../recoil/post/post';
import PostItem from './PostItem';

const MainPost = () => {
  const [postListState, setPostListState] = useRecoilState(postList);
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

  console.log(postListState);

  return (
    <div className='MainPost'>
      {postListState.map((it) => (
        <PostItem key={it._id} {...it} />
      ))}
    </div>
  );
};

export default MainPost;
