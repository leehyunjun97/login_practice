import React, { useState } from 'react';
import { uploadPost } from './scripts/post';

const PostEditor = (props) => {
  const [postEditorState, setPostEditorState] = useState({
    title: '',
    content: '',
    shere: true,
  });

  const userId = localStorage.getItem('id');

  const editorStateHandler = (key, value) => {
    setPostEditorState((prev) => ({ ...prev, [key]: value }));
  };

  const onCreatePost = async () => {
    const today = new Date();
    const dateFormat =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();

    try {
      const createPostCom = await uploadPost(
        userId,
        postEditorState.title,
        postEditorState.content,
        postEditorState.shere,
        dateFormat
      );
      alert('작성 완료');
      console.log(createPostCom);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='PostEditor'>
      <h2>포스트 작성하기</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className=''>
          <input
            className='title_input'
            placeholder='제목'
            name='title'
            value={postEditorState.title}
            onChange={(e) => {
              editorStateHandler('title', e.target.value);
            }}
          />
          <textarea
            placeholder='내용'
            name='content'
            value={postEditorState.content}
            onChange={(e) => {
              editorStateHandler('content', e.target.value);
            }}
          />
          <section className='share_btn_section'>
            <label>
              <input
                type='radio'
                name='share_radio'
                value={postEditorState.shere}
                onChange={() => {
                  editorStateHandler('shere', true);
                }}
              />
              <span>공개</span>
            </label>
            <label>
              <input
                type='radio'
                name='share_radio'
                value={postEditorState.shere}
                onChange={() => {
                  editorStateHandler('shere', false);
                }}
              />
              <span>비공개</span>
            </label>
          </section>
          <button className='create_btn' onClick={onCreatePost}>
            작성하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEditor;
