import React, { useEffect, useState, Modal, Button } from 'react'
import NavBar from '../NavBar/NavBar'
import LastRelase from '../Post/LastRelase'


function HomePage() {
    const [posts, setPosts] = useState([])

    const getPostsApi = async () => {
        try {
            const data = await fetch(`${REACT_APP_SERVER_BASE_URL}/posts`)

            const response = await data.json()

            setPosts(response.posts)
        } catch (error) {
            console.log('Errore nella risposta!')
        }
    }

    useEffect(() => {
        getPostsApi()
    }, [])

    return (
        <>
            <NavBar />
            <LastRelase posts={posts} />
        </>
    )
}
export default HomePage
