import { takeEvery, call, put, all } from 'redux-saga/effects'
import { forumService } from '../services/forum.service';
import { forumConstants } from '../constants/forum.constants';

 function* loadPosts(payload) {
  try {
    const response = yield call(forumService.loadPosts, payload);
    yield put({ type: forumConstants.LOAD_POSTS_SUCCESS, response });
  } catch(error) {
    yield put({ type: forumConstants.LOAD_POSTS_FAILURE, error });
  }
}


function* loadComments(payload) {
  try {
    const response = yield call(forumService.loadComments, payload);
    yield put({ type: forumConstants.LOAD_COMMENTS_SUCCESS, response });
  } catch(error) {
    yield put({ type: forumConstants.LOAD_COMMENTS_FAILURE, error });
  }
}

function* addPost(payload) {
  try {
    console.log(payload);
    const response = yield call(forumService.addPost, payload);
    console.log(response)
    yield [
      put({ type: forumConstants.ADD_POST_SUCCESS, payload })
    ];
  } catch(error) {
    yield put({ type: forumConstants.ADD_POST_FAILURE, error });
  }
}

function* addComment(payload) {
  try {
    console.log(payload);
    const response = yield call(forumService.addComment, payload);
    console.log(response)
    yield [
      put({ type: forumConstants.ADD_COMMENT_SUCCESS, payload })
    ];
  } catch(error) {
    yield put({ type: forumConstants.ADD_COMMENT_FAILURE, error });
  }
}

function* watchLoadPosts() {
    yield takeEvery(forumConstants.LOAD_POSTS, loadPosts)
  }

  function* watchLoadComments() {
    yield takeEvery(forumConstants.LOAD_COMMENTS, loadComments)
  }

  function* watchAddPost() {
    yield takeEvery(forumConstants.ADD_POST, addPost)
  }
  function* watchAddComment() {
    yield takeEvery(forumConstants.ADD_COMMENT, addComment)
  }
  export function* forumSaga() {
    yield all([
        watchLoadPosts(),
        watchLoadComments(),
        watchAddPost(),
        watchAddComment()
    ])
  }