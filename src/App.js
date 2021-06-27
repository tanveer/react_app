import { useState, useEffect} from 'react'
import { Card, Container, Row, Col} from "react-bootstrap"
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts"
const USERS_URL = "https://jsonplaceholder.typicode.com/users"

function UserProfile({user}) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getUserPosts()
  })
  
  const getUserPosts = () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
      .then(res => res.json())
      .then(setPosts);
  }

  return (
    <Container>
      <h1>Posts by, {user.name}</h1>
      <Row>
          {
            posts.map ( post => 
            <Col className="mt-4" >
                <Post post={post} /> 
            </Col>
            )
          }
      </Row> 
    </Container>
  )
}


function Comments({id}) {
  const comments_Url = `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  const [comments, setComments] = useState([])

  useEffect(() => {
    getCommments()
  })

  const getCommments = () => {
    fetch(comments_Url)
    .then(res => res.json())
    .then(setComments)
  }

  return (
    <>

      {
        comments.map( c => 
          <div key={c.id}>
              <hr></hr> <p>{c.body}</p>
          </div>  
        )
      }
    </>
  )
}

function Post({post}) {
  const {userId, id, title, body} = post
  const [userInfo, setUserInfo] = useState([])
  
  useEffect(() => {
    getUserInfo()
  })

  const getUserInfo = () => {
    fetch(`${USERS_URL}/${userId}`)
    .then(res => res.json())
    .then(setUserInfo)
  }

  return (
      <Card bg="info" text="black" style={{ width: "25rem", height: "15rem" }}>
        <Card.Body>
           <Card.Title style={{fontSize: "1.25rem", fontWeight: "Bold", textTransform: "capitalize", color: "white"}}>{title}</Card.Title>
              <Link to={`/${id}`}>
              <Card.Text style={{fontSize: "1rem", color: "black"}}>
              {body}
              </Card.Text>
              </Link>
            <Card.Subtitle>{userInfo.name}</Card.Subtitle>
        </Card.Body>
      </Card>
  ) 
}

function Detail({post, userInfo}) {
  const {id, title, body} = post
  return (
    <Container>
      <Row>
        <Col>
          <Card text="black" style={{ width: "auto", height: "auto" }}>
            <Card.Body>
              <Card.Title style={{fontSize: "1.25rem", fontWeight: "Bold", textTransform: "capitalize"}}>{title}</Card.Title>
              <Card.Text style={{fontSize: "1rem", color: "black"}}>
                {body}
              </Card.Text>
              <Link to={`/user/${id}`}>
                 <Card.Subtitle>{userInfo.name}</Card.Subtitle>
              </Link>
              <Comments id={id}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

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
                    <Route exact={true} path="/">
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
              let selectedPost = posts.find(
                post =>
                  parseInt(post.id) === parseInt(props.match.params.postId)
              )

              let selectedUser = users.find(
                user => parseInt(user.id) === parseInt(selectedPost.userId)
              )

              return selectedPost !== undefined ? (
                  <Detail post={selectedPost} userInfo={selectedUser}/>
              ) : (
                <h1>Nothing here!!</h1>
              )
            }}
          />
          <Route
            exact
            path="/user/:userId"
            render={props => {
              let selectedUser = users.find(
                user =>
                  parseInt(user.id) === parseInt(props.match.params.userId)
              );
              return selectedUser !== undefined ? (
                <UserProfile user={selectedUser} />
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



