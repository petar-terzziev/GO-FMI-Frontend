import { Container } from "react-bootstrap";
import  { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, connect } from 'react-redux';
import "./AddPost.css";
import { forumConstants } from '../../constants/forum.constants';

function Post (props) {


    const [inputs, setInputs] = useState({
        content: ''
      });
    const {content } = inputs;
    const dispatch = useDispatch();
    useEffect(() => { 
        console.log(props);
        dispatch({type: forumConstants.LOAD_COMMENTS, postId: props.match.params.postId});
    }, []);




    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
        // axios.post(`http://localhost:8888/register`, {username: title, content: content}).then(res => {
        //   console.log(res);
        // });
    }

    function handleSubmit(e) {
        console.log('iughuyg');
        e.preventDefault();
        if (content) {
            dispatch({type: forumConstants.ADD_COMMENT, comment: {content, threadId: props.match.params.postId, userId: props.authentication.user.iss } });
        }
    }

    function validateForm () {
        console.log(props.posts.find(x => x.ID == props.match.params.postId));
        return content.length > 0;
      }
    const currPost = props.posts.find(x => x.ID == props.match.params.postId)
    return (
        <div className="Forum">
        {currPost && <h2>{currPost.Title}</h2>}
        <div>

            <Container> 
            {currPost && <h3>{currPost.Content}</h3>}
            </Container>

            <Container> <h6> Comments:</h6></Container>
            {/* <p>{props.posts.find(p => p.id === props.match.params.postId).content}</p> */}
            {props.posts.find(x => x.ID == props.match.params.postId) && props.posts.find(x => x.ID == props.match.params.postId).comments && props.posts.find(x => x.ID == props.match.params.postId).comments.map(c =>
            <Container key={c.ID}>
                <div> {c.Poster} says</div>
                   <div>{c.Content}</div>
            </Container> )}
            <Form onSubmit={handleSubmit}>
            <Form.Group size="sm" controlId="content">
            <Form.Control
              type="content"
              name = "content"
              value={content}
              onChange={handleChange}
            />
          </Form.Group>
          <Button block size="sm" type="submit" disabled={!validateForm()}>
            Add Post
          </Button>
          </Form>
        </div>
        </div>
    );
}

const mapStateToProps = state =>  {
 
    return {
    authentication: state.authentication,
    posts: state.forum.posts
    } 
};

export default connect(
    mapStateToProps
)(Post);
  