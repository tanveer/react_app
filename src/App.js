import { useState, useEffect} from 'react'
import { Card, CardDeck, CardColumns, Container, Row, Col} from "react-bootstrap"
import './App.css';

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts"
const USERS_URL = "https://jsonplaceholder.typicode.com/users"

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
          <Card.Text style={{fontSize: "1rem", color: "black"}}>
            {body}
          </Card.Text>
          <Card.Subtitle>{userInfo.name}</Card.Subtitle>
        </Card.Body>
      </Card>
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
    <Container>
      <Row>
      {
        posts.map ( post => 
        <Col className="mt-4" >
          <Post post={post}/> 
        </Col>
        )
      }
      </Row>
   </Container>

  );
}

export default App;



