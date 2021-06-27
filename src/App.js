import { useState, useEffect} from 'react'
import { Container, Row, Col} from "react-bootstrap"
import './App.css';
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

import UserPosts from './userPosts';
import Post from './post'
import Detail from './detail';

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts"
const USERS_URL = "https://jsonplaceholder.typicode.com/users"



function App() {
  const  [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
    getPosts()
  })

  const getUsers = () => {
    fetch(USERS_URL)
    .then(res => res.json())
    .then(setUsers)
    .catch(console.log("Failed"))
  }

  const getPosts = (id) => {
    fetch(POSTS_URL)
    .then(res => res.json())
    .then(setPosts)
    .catch(console.log("Failed"))
  }

  return (
    <Router>
      <Switch>
        <Container>
            <Row>
              {
                posts.map ( post => 
                <Col className="mt-4" >
                  <Route 
                    exact
                    path="/">
                      <Post post={post} /> 
                  </Route>
                </Col>
                )
              }
            </Row> 
          <Route 
            exact
            path="/:postId"
            render={ props => {
              let selectedPost = posts.find (
                post => parseInt(post.id) === parseInt(props.match.params.postId)
              )

              let selectedUser = users.find (
                user => parseInt(user.id) === parseInt(selectedPost.userId)
              )

              return selectedPost !== undefined ? (
                  <Detail post={selectedPost} user={selectedUser}/>
              ) : (
                <h1>Nothing here!!</h1>
              )
            }
          }
          />

          <Route
            exact
            path="/user/:userId"
            render={ props => {
              let selectedUser = users.find(
                user =>
                  parseInt(user.id) === parseInt(props.match.params.userId)
              );
              return selectedUser !== undefined ? (
                <UserPosts user={selectedUser} />
              ) : (
                <h1>Nothing here!!</h1>
              )
            }}
          />      
        </Container>
      </Switch>
    </Router>
  )
}

export default App;