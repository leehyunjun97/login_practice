import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostItem = (postProps) => {
  const navigate = useNavigate();

  return (
    <div
      className='PostItem'
      onClick={(e) => {
        navigate(`detail/${postProps._id}`);
      }}
    >
      <div className='post_img'>
        <img src={postProps.postImage} alt='postImg' />
      </div>
      <div className='post_content'>
        <h4>{postProps.title}</h4>
        <span className='post_writer'>{postProps.writer.nickName}</span>
      </div>
    </div>
  );
};
export default PostItem;
