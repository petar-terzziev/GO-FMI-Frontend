import './App.css';
import {Router, Route, Redirect } from "react-router-dom";
import Login from './components/app-entry/Login';
import Register from './components/app-entry/Register';
import Forum from './components/forum/Forum';
import Post from './components/forum/Post';
import AddPost from './components/forum/AddPost';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import Container from  'react-bootstrap/Container';
import Nav from  'react-bootstrap/Nav';
import { history } from './helpers';
import { connect, useDispatch } from "react-redux";
import { userConstants } from './constants/user.constants';


function App(props) {
  const dispatch = useDispatch();
  const logoutfunc = () => {
    dispatch({type: userConstants.LOGOUT});
  }
  return (
    <Router history={history}>
      <Navbar bg="primary" variant="dark">
        <Container>
          <img src="https://cdn.worldvectorlogo.com/logos/gopher.svg" width="100" height="50"></img>
          <Navbar.Brand href="/login">Introduction to Go</Navbar.Brand>
          <Nav className="me-auto">
            { props.authentication.loggedIn === false ?
          (<div class="link-container"><Link className="nav-link" to="/login">Login</Link>
          <Link className="nav-link" to="/register">Register</Link></div>) : (<div  class="link-container"><Link className="nav-link" to="/forum">Forum</Link> <Link className="nav-link" to="/login" onClick={logoutfunc}>logout</Link></div>)
          }
          </Nav>
        </Container>
      </Navbar>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/forum" component={Forum} />
      <Route exact path="/post/:postId" component={Post}/>
      <Route exact path="/addPost" component={AddPost}/>
    </Router>
  );
}

const mapStateToProps = state =>  {
 
  return {
  authentication: state.authentication,
  } };

export default connect(
  mapStateToProps
)(App);