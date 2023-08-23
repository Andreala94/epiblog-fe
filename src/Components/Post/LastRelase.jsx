import React, { useEffect } from 'react'
import CardPosts from './CardPosts'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { nanoid } from 'nanoid'

const LastRelase = ({ posts }) => {

    useEffect(() => {

    }, [])

    return (
        <>
            <Container className="mt-5">
                <Row>
                    {posts &&
                        posts.map((post) => (
                            <Col
                                key={post.id}
                                md={6}
                                lg={3}
                                sm={4}
                                className="mb-4"
                            >
                                <CardPosts
                                    key={nanoid}
                                    cover={post.cover}
                                    title={post.title}
                                    category={post.category}
                                    content={post.content}
                                />
                            </Col>
                        ))}
                </Row>

                <Container className="text-center mt-5">
                    <Link to="/newpost">
                        <p>New Post</p>
                    </Link>
                    <Link to="/form">
                        <p>Registarti</p>
                    </Link>
                </Container>
            </Container>
        </>
    )
}

export default LastRelase
