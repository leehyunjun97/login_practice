import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { postListDetail } from '../../recoil/post/post';
import { deletePost, editPost } from './scripts/post';

const PostDetail = () => {
  const [postDetailState, setPostDetailState] = useRecoilState(postListDetail);
  const [isEditPostState, setIsEditPostState] = useState(false);
  const [newContentState, setNewContentState] = useState('');
  const params = useParams();
  const id = localStorage.getItem('id');
  const navigate = useNavigate();
  const newContentRef = useRef();

  useEffect(() => {
    if (params.id) {
      const getPostDetail = async () => {
        try {
          const getPostDetailCom = await axios.get(
            `http://localhost:5000/post/detail/${params.id}`
          );
          const { _id, userId, title, content, date, postImage } =
            getPostDetailCom.data.postItem;
          const writer = getPostDetailCom.data.postItem.writer.nickName;
          setPostDetailState({
            _id,
            userId,
            title,
            content,
            writer,
            date,
            postImage,
          });
        } catch (error) {
          alert('존재하지 않는 포스트입니다.');
          navigate('/post');
        }
      };
      getPostDetail();
    }
  }, [params.id, setPostDetailState, navigate]);

  const isEditHandler = () => {
    setIsEditPostState(!isEditPostState);
  };

  const onDeletePost = async () => {
    try {
      const deletePostCom = await deletePost(params.id);
      if (deletePostCom.data.success) {
        navigate('/post');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEditPost = async () => {
    try {
      const editPostCom = await editPost(
        params.id,
        postDetailState.title,
        newContentState
      );
      console.log(editPostCom);
      alert('수정 완료');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='PostDetail'>
      <div className='post_img_section'>
        <img src={postDetailState.postImage} alt='post_img' />
      </div>
      <div className='post_section'>
        <div className='post_span_section'>
          <span className='postDetail_writer'>
            {postDetailState.writer}'s post
          </span>
          <span className='postDetail_date'>{postDetailState.date}</span>
        </div>

        <div className='postDetail_content_section'>
          {!isEditPostState ? (
            <>
              <span className='postDetail_content'>
                {postDetailState.content}
              </span>
            </>
          ) : (
            <>
              <textarea
                ref={newContentRef}
                className='post_newContent'
                value={newContentState}
                onChange={(e) => {
                  setNewContentState(e.target.value);
                }}
              />
            </>
          )}
        </div>
      </div>
      {id === postDetailState.userId && (
        <div className='post_btn_section'>
          {!isEditPostState ? (
            <>
              <button
                onClick={() => {
                  isEditHandler();
                  setNewContentState(postDetailState.content);
                }}
              >
                수정
              </button>
              <button
                className='post_remove_btn'
                onClick={(e) => {
                  if (window.confirm('정말 삭제하시겠습니까?')) {
                    onDeletePost();
                  }
                }}
              >
                삭제
              </button>
            </>
          ) : (
            <>
              <button
                onClick={(e) => {
                  if (newContentState === '') {
                    alert('컨텐츠를 작성해주세요');
                    newContentRef.current.focus();
                  } else {
                    onEditPost();
                    setPostDetailState({
                      ...postDetailState,
                      content: newContentState,
                    });
                    isEditHandler();
                  }
                }}
              >
                수정하기
              </button>
              <button
                className='post_remove_btn'
                onClick={(e) => {
                  isEditHandler();
                }}
              >
                수정취소
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PostDetail;
