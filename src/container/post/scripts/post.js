import axios from 'axios';

export const uploadPost = async (
  userId,
  title,
  content,
  image,
  sharePost,
  date
) => {
  const writer = userId;
  const postImage = image;
  try {
    const uploadPostCom = await axios.post(
      'http://localhost:5000/post/upload',
      {
        userId,
        title,
        content,
        postImage,
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

export const deletePost = async (id) => {
  try {
    const deletePostCom = await axios.delete(
      `http://localhost:5000/post/${id}`
    );
    return deletePostCom;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const editPost = async (id, title, content, postImage) => {
  if (!postImage) {
    try {
      const editPostCom = await axios.put(`http://localhost:5000/post/edit`, {
        id,
        title,
        content,
      });
      return editPostCom;
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    try {
      const editPostCom = await axios.put(`http://localhost:5000/post/edit`, {
        id,
        title,
        content,
        postImage,
      });
      return editPostCom;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
