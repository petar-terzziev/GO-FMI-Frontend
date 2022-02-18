import { forumConstants } from '../constants/forum.constants';

const initialState =  {posts: []};

export function forum(state = initialState, action) {
    switch (action.type) {
        case forumConstants.LOAD_POSTS:
            return {
                ... state,
                posts: action.posts
            };
        case forumConstants.LOAD_COMMENTS:
            return {
                ... state,
            };
        case forumConstants.LOAD_COMMENTS_SUCCESS:
            return {
                ... state,
                posts: state.posts.map(post => action.response === null ||post.id !== action.response[0].postId ? post: {...post, comments:action.response})
            };
        case forumConstants.LOAD_COMMENTS_FAILURE:
            return {
                ... state,
                posts: [...state.posts]
            };
        case forumConstants.LOAD_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.response
            };
        case forumConstants.LOAD_POSTS_FAILURE:
            return {
                ... state,
                posts: []    
            }
        case forumConstants.ADD_POST:
            return {
                ...state,
                posts: [...state.posts]
            };
        case forumConstants.ADD_POST_SUCCESS:
                return {
                    ...state,
                    posts: [...state.posts, action.post]
                };
        case forumConstants.ADD_POST_FAILURE:
                return {
                    ...state,
                    posts: [...state.posts]
                };
        case forumConstants.ADD_COMMENT:
            return {
                ...state,
                posts: [...state.posts]
            };
        case forumConstants.ADD_COMMENT_SUCCESS:
                return {
                    ...state,
                    posts: state.posts.map(post => post.id !== action.comment.threadId ? post: {...post, comments: [...post.comments,action.comment]})
                };
        case forumConstants.ADD_COMMENT_FAILURE:
                return {
                    ...state,
                    posts: [...state.posts]
                };
        default:
            return state
    }
}