import React from 'react';

const PostItem = (postProps) => {
  return (
    <div className='PostItem'>
      <div className='post_img'>
        <img src={`${process.env.PUBLIC_URL}/img/post.png`} alt='postImg' />
      </div>
      <div className='post_content'>
        <h4>{postProps.title}</h4>
        <span className='post_writer'>{postProps.writer.nickName}</span>
      </div>
    </div>
  );
};
export default PostItem;
