import { atom } from 'recoil';

export const postList = atom({
  key: 'postList',
  default: [],
});

export const postListDetail = atom({
  key: 'postListDetail',
  default: {
    _id: '',
    userId: '',
    title: '',
    postImage: '',
    content: '',
    writer: '',
    date: '',
  },
});
