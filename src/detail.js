import React, { useRef } from 'react';
import {Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Comments from './comments';


const Detail = ({post, user}) => {
    const {title, body} = post
    const { username, name, id} = user
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
                    <Card.Subtitle>{name}</Card.Subtitle>
                </Link>
                <Comments id={post.id}/>
                </Card.Body>
            </Card>
            </Col>
        </Row>
        </Container>
    )
};

export default Detail;