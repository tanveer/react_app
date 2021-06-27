import React, { useState, useEffect } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import Post from './post'

const UserPosts = ({user}) => {
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

export default UserPosts