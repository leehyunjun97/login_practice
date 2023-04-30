import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { postListDetail } from '../../recoil/post/post';

const PostDetail = () => {
  const [postDetailState, setPostDetailState] = useRecoilState(postListDetail);
  const params = useParams();
  const id = localStorage.getItem('id');

  useEffect(() => {
    if (params.id) {
      const getPostDetail = async () => {
        const getPostDetailCom = await axios.get(
          `http://localhost:5000/post/detail/${params.id}`
        );
        const { _id, userId, title, content, date } =
          getPostDetailCom.data.postItem;
        const writer = getPostDetailCom.data.postItem.writer.nickName;
        setPostDetailState({ _id, userId, title, content, writer, date });
      };
      getPostDetail();
    }
  }, [params.id, setPostDetailState]);

  return (
    <div className='PostDetail'>
      <div className='post_img_section'>
        <img src={`${process.env.PUBLIC_URL}/img/post.png`} alt='post_img' />
      </div>
      <div className='post_section'>
        <span className='postDetail_writer'>
          {postDetailState.writer}'s post
        </span>
        <div className='postDetail_content_section'>
          <span className='postDetail_content'>{postDetailState.content}</span>
        </div>
      </div>
      {id === postDetailState.userId && (
        <div className='post_btn_section'>
          <button>수정</button>
          <button className='post_remove_btn'>삭제</button>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
