import axios from 'axios';

export const uploadPost = async (userId, title, content, sharePost, date) => {
  const writer = userId;
  try {
    const uploadPostCom = await axios.post(
      'http://localhost:5000/post/upload',
      {
        userId,
        title,
        content,
        postImage: '아무개',
        sharePost,
        date,
        writer,
      }
    );
    return uploadPostCom.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
