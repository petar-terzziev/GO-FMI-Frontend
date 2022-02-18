import api from '../helpers/api'
import { history } from '../helpers';
export const forumService = {
    loadPosts,
    loadComments,
    addPost,
    addComment
};

function loadPosts(payload) {
    console.log(payload);
    return api.get(`/forum/getAll`).then(handleResponse).catch(err => {throw err;});
}

function loadComments(payload) {
    console.log(payload);
    return api.get(`/forum/getComments/${payload.postId}`).then(handleResponse).catch(err => {throw err;});
}
function addPost(payload) {
    console.log(payload);
    return api.post(`/forum/postThread`, payload.post).then((res) => {                
        history.push('/forum');
        return res.data;
}).catch(err => {throw err;});
}
function addComment(payload) {
    console.log(payload);
    return api.post(`/forum/postComment`, payload.comment).then(handleResponse).catch(err => {throw err;});
}

function handleResponse(response) {
    const data = response.data;
    console.log(data);
    return data;
}