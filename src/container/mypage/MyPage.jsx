import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userInfo } from '../../recoil/user/user';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const [userInfoData, setUserInfo] = useRecoilState(userInfo);
  const [isNicknameEdit, setIsNicknameEdit] = useState(false);
  const [newNicknameState, setNewNicknameState] = useState('');
  const navigate = useNavigate();

  const isNicknameEditHandler = () => {
    setIsNicknameEdit(!isNicknameEdit);
  };

  const editNickname = async () => {
    try {
      const editNickCom = await axios.put(
        `http://localhost:5000/users/update/nickname`,
        {
          id: userInfoData._id,
          nickName: newNicknameState,
        }
      );
      if (editNickCom) {
        alert('수정 완료');
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className='MyPage'>
      <div className='profile_img_section'>
        <img
          src={`${process.env.PUBLIC_URL}/img/profile_dog.png`}
          alt='profile_img'
        />
      </div>
      <div className='profile_section'>
        {isNicknameEdit ? (
          <>
            <input
              placeholder='수정할 닉네임 적어주3'
              name='newNickname'
              value={newNicknameState}
              onChange={(e) => {
                setNewNicknameState(e.target.value);
              }}
            />
          </>
        ) : (
          <>
            <span className='nickname_span'>{userInfoData.nickName}</span>
          </>
        )}

        <section>
          <span className='email_span'>{userInfoData.email}</span>
        </section>
        {isNicknameEdit ? (
          <>
            <button
              onClick={(e) => {
                if (newNicknameState.length < 6) {
                  alert('닉네임은 6글자 이상 사용해주세요');
                  return;
                } else if (window.confirm(`수정하시겠습니까`)) {
                  setUserInfo({ ...userInfoData, nickName: newNicknameState });
                  editNickname();
                  isNicknameEditHandler();
                  console.log(userInfoData);
                }
              }}
              style={{ right: '22%' }}
            >
              수정하기
            </button>
            <button
              onClick={(e) => {
                isNicknameEditHandler();
              }}
            >
              수정취소
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setNewNicknameState(userInfoData.nickName);
                isNicknameEditHandler();
              }}
            >
              닉네임 수정하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MyPage;
