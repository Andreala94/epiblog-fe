import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import NavBar from '../NavBar/NavBar'
import { useNavigate } from "react-router-dom"


export const NewPost = () => {
    const navigate = useNavigate();

    const [titleValue, setTitleValue] = useState('')
    const [authorValue, setAuthorValue] = useState('')
    const [categoryValue, setCategoryValue] = useState('')
    const [contentValue, setContentValue] = useState('')
    const [coverValue, setCoverValue] = useState(null)
    const [readTimeValue, setReadTimeValue] = useState('')
    const [readTimeUnit, setReadTimeUnit] = useState('')

    const handleFileChange = (e) => {
        setCoverValue(e.target.files[0])
    }

    const uploadFile = async (file) => {
        const fileData = new FormData() //metodo per appendere file data in un form
        fileData.append('cover', file)

        try {
            const response = await fetch( `${process.env.REACT_APP_SERVER_BASE_URL}/posts/cloudUpload`,
                {
                    method: 'POST',
                    body: fileData,
                }
            )
            return await response.json()
           
        } catch (error) {
            console.error('File uploads error!')
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault()

        setTitleValue(event.target.value)
        setAuthorValue(event.target.value)
        setCategoryValue(event.target.value)
        setContentValue(event.target.value)
        // setReadTimeUnit(event.target.value);
        // setReadTimeValue(event.target.value);
        setCoverValue(event.target.value)

        if (coverValue) {
            try {
                const uploadedFile = await uploadFile(coverValue)
                console.log(uploadedFile)

                const postFormData = {
                    category: categoryValue,
                    title: titleValue,
                    readTime: readTimeValue,
                    author: authorValue,
                    content: contentValue,
                    cover: uploadedFile.cover,
                }

                const response = await fetch( `${process.env.REACT_APP_SERVER_BASE_URL}/posts/create`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(postFormData),
                    }
                )
                return response.json()
                .then((response)=> navigate("/homepage"))
            } catch (error) {
                console.error('Failed to save the post')
            }
        } else {
            console.error('Please select at least one file to upload')
        }
    }

    //? gestire un input di tipo file (enctype)

    return (
        <>
            <NavBar />

            <Form
                className="m-5"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
            >
                <Form.Group controlId="formTitle">
                    <Form.Label>Titolo</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Inserisci il titolo"
                        onChange={(event) => setTitleValue(event.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formAuthor" className="mt-3">
                    <Form.Label>Autore</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Inserisci l'autore"
                        onChange={(event) => setAuthorValue(event.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formCategory" className="mt-3">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Inserisci la categoria"
                        onChange={(event) =>
                            setCategoryValue(event.target.value)
                        }
                    />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Carica un'immagine</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>

                <Form.Group controlId="formContent" className="mt-3">
                    <Form.Label>Contenuto</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Inserisci il contenuto"
                        onChange={(event) =>
                            setContentValue(event.target.value)
                        }
                    />
                </Form.Group>

                <Button className="ms-1 mt-5" type="submit">
                    Crea Post
                </Button>
            </Form>
        </>
    )
}
