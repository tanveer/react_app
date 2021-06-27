import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import {
    Link
  } from "react-router-dom";

const USERS_URL = "https://jsonplaceholder.typicode.com/users"

const Post = ({post}) => {
    const {userId, id, title, body} = post
    const [user, setUser] = useState([])
  
    useEffect(() => {
        getUser()
    })

    const getUser = () => {
        fetch(`${USERS_URL}/${userId}`)
        .then(res => res.json())
        .then(setUser)
    }

    return (
        <Link to={`/${id}`} style={{textDecoration: "none"}}>
        <Card bg="info" text="black" style={{ width: "25rem", height: "15rem"}}>
            <Card.Body>
            <Card.Title style={{fontSize: "1.25rem", fontWeight: "Bold", textTransform: "capitalize", color: "white"}}>{title}</Card.Title>
                <Card.Text style={{fontSize: "1rem", color: "black"}}>
                {body}
                </Card.Text>
                <Card.Subtitle>{user.name}</Card.Subtitle>
            </Card.Body>
        </Card>
        </Link>
    ) 
}

export default Post;