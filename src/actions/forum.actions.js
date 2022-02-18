import { forumConstants } from '../constants/forum.constants';
export const loadPosts = (posts) => {
    return {
      type: forumConstants.LOAD_POSTS,
      posts
    }
  };