import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, connect } from 'react-redux';
import "./AddPost.css";
// import { registerUserAction } from '../../actions/user.actions';
import { forumConstants } from '../../constants/forum.constants';


function AddPost(props) {
  const [inputs, setInputs] = useState({
      title: '',
      content: ''
    });
  const { title, content } = inputs;
  // const loggingIn = useSelector(state => state.authentication.loggingIn);
  const dispatch = useDispatch();

  // reset login status
  // useEffect(() => { 
  //     dispatch(userActions.logout()); 
  // }, []);

  function handleChange(e) {
      const { name, value } = e.target;
      setInputs(inputs => ({ ...inputs, [name]: value }));
      // axios.post(`http://localhost:8888/register`, {username: title, content: content}).then(res => {
      //   console.log(res);
      // });
  }

  function handleSubmit(e) {
      e.preventDefault();
      if (title && content) {
          dispatch({type: forumConstants.ADD_POST, post: {title, content, userId: props.authentication.user.iss } });
      }
  }

  function validateForm () {
    return title.length > 0 && content.length > 0;
  }

    return (
      <div className="Login">
        <h2> Add Post </h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="title">
            <Form.Label>title</Form.Label>
            <Form.Control
              autoFocus
              type="title"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="content">
            <Form.Label>content</Form.Label>
            <Form.Control
              type="content"
              name = "content"
              value={content}
              onChange={handleChange}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Add Post
          </Button>
        </Form>
      </div>
    );
}

const mapStateToProps = state =>  {
 
  return {
  authentication: state.authentication,
  } };

export default connect(
  mapStateToProps
)(AddPost);