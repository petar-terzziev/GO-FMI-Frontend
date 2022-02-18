import api from '../helpers/api';
import { history } from '../helpers';
// import jwt_decode from 'jwt-decode';
// import { useDispatch, useSelector } from 'react-redux';
// import { userConstants } from '../constants/user.constants';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(user) {
    const requestOptions = {
    email: user.user.email, 
    password: user.user.password
    };
    console.log('making a request');
    return api.post(`/login`, requestOptions)
        .then((res) => {
            if (res.data) {
                localStorage.setItem('jwtToken',res.data);
                // const decoded = jwt_decode(localStorage.jwtToken);
                // useDispatch({type: userConstants.SET_USER, decoded});
                history.push('/forum');
                return res.data
            }
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        username: user.user.username,
        email: user.user.email,
        password: user.user.password,
        fn: user.user.fn
    };
    console.log(user);
    return api.post(`/register`, requestOptions).then(handleResponse).catch(err => {throw err;});
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        body: JSON.stringify(user)
    };

    return fetch(`/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
    };

    return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
        const data = response.data;
        console.log(data);
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
            }
        return data;
}