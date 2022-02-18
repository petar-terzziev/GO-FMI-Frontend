import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { forumConstants } from '../../constants/forum.constants';
import { connect, useDispatch } from "react-redux";
import {useEffect} from "react"

 function Forum (props) {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: forumConstants.LOAD_POSTS, posts: []});
      },[] );
    return (
        <div className="Forum">
        <h2> Forum </h2>
        <Link className="nav-link" to={`/addPost`} >Add Post</Link>
        <div>
            {props.posts.map((p,index) =>
            <Container key={index}>
                    <Link className="nav-link" to={`/post/${p.ID}`}>{p.Title}</Link>
            </Container> )}
        </div>
        </div>
    );
}

const mapStateToProps = state =>  {
    console.log(state);
    return {
    posts: state.forum.posts,
    } };
  
  export default connect(
    mapStateToProps
  )(Forum);