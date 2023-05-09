import React, { useRef, useState } from 'react';
import { uploadPost } from './scripts/post';
import { useNavigate } from 'react-router-dom';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from '../../scripts/firebase';

const PostEditor = () => {
  const [postEditorState, setPostEditorState] = useState({
    title: '',
    content: '',
    image: '',
    shere: true,
  });

  const [postImg, setPostImg] = useState();
  const [postImgSrc, setPostImgSrc] = useState(null);

  const userId = localStorage.getItem('id');
  const navigate = useNavigate();
  const titleRef = useRef();
  const contentRef = useRef();
  const postImgRef = useRef();

  const editorStateHandler = (key, value) => {
    setPostEditorState((prev) => ({ ...prev, [key]: value }));
  };

  const fileHandler = () => {
    const file = postImgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPostImgSrc(reader.result);
    };

    setPostImg(file);
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
      if (postImg) {
        const postImgRef = ref(storage, `images/post/${userId}_${today}`);
        await uploadBytes(postImgRef, postImg).then(() => {
          const uploadTask = uploadBytesResumable(postImgRef, postImg);
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            setPostEditorState({ ...postEditorState, image: url });
            const createPostCom = await uploadPost(
              userId,
              postEditorState.title,
              postEditorState.content,
              url,
              postEditorState.shere,
              dateFormat
            );
            console.log(createPostCom);
            navigate(`/post/detail/${createPostCom.postItem._id}`);
          });
        });
      } else {
        const url =
          'https://firebasestorage.googleapis.com/v0/b/montamp-be910.appspot.com/o/images%2Fdefault.png?alt=media&token=c83dc44d-ef15-4941-b192-ee5eed5bc873';
        const createPostCom = await uploadPost(
          userId,
          postEditorState.title,
          postEditorState.content,
          url,
          postEditorState.shere,
          dateFormat
        );
        console.log(createPostCom);
        navigate(`/post/detail/${createPostCom.postItem._id}`);
      }

      alert('작성 완료');
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
            ref={titleRef}
            className='title_input'
            placeholder='제목'
            name='title'
            value={postEditorState.title}
            onChange={(e) => {
              editorStateHandler('title', e.target.value);
            }}
          />
          <textarea
            ref={contentRef}
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
                checked={postEditorState.shere === true}
                type='radio'
                name='share_radio'
                value={postEditorState.shere}
                onChange={(e) => {
                  editorStateHandler('shere', true);
                }}
              />
              <span>공개</span>
            </label>
            <label>
              <input
                checked={postEditorState.shere === false}
                type='radio'
                name='share_radio'
                value={postEditorState.shere}
                onChange={(e) => {
                  editorStateHandler('shere', false);
                }}
              />
              <span>비공개</span>
            </label>
          </section>
          <div>
            <input
              ref={postImgRef}
              type='file'
              accept='image/*'
              onChange={(e) => {
                fileHandler();
              }}
            />
            <button
              onClick={(e) => {
                postImgRef.current.value = '';
                setPostImgSrc('');
              }}
            >
              사진삭제
            </button>
          </div>
          <div className='img_preview'>
            <img
              src={
                postImgSrc
                  ? postImgSrc
                  : `${process.env.PUBLIC_URL}/img/post.png`
              }
              alt='미리보기'
            />
          </div>
          <button
            className='create_btn'
            onClick={() => {
              if (postEditorState.title.trim() === '') {
                alert('제목을 입력해주세요');
                titleRef.current.focus();
              } else if (postEditorState.content.trim() === '') {
                alert('컨텐츠를 입력해주세요');
                contentRef.current.focus();
              } else {
                onCreatePost();
              }
            }}
          >
            작성하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEditor;
