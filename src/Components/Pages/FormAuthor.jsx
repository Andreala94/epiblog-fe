import React, { useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap';

const FormAuthor = () => {
   const [formData, setFormData] = useState({})
   const [avatar, setAvatar] = useState(null)

  const onChangeHandleFile = (e) =>{
    setAvatar(e.target.files[0])
  }

  console.log(formData);

  const uploadAvatar = async (file)=>{
    const avatarFile = new FormData()
    avatarFile.append('avatar', file)
    try {
        const response = await fetch(`${REACT_APP_SERVER_BASE_URL}/register/avatarCloud`, {
            method: "POST",
            body: avatarFile
        })
            
        return await response.json()
    } catch (error) {
        console.log(error);
    }
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    if(avatar ){
        try {
            const uploadAvatarImage = await uploadAvatar(avatar)
            const formDataWithAvatar ={
                ...formData,
                avatar: uploadAvatarImage.avatar
            }
            const response = await fetch(`${REACT_APP_SERVER_BASE_URL}/register/authors`, {
                method: "POST",
                body: JSON.stringify(formDataWithAvatar),
                headers: {"Content-Type":"application/json"}
            })
        } catch (error) {
            console.log(error);
        }
    }
    else{
        console.log( "Perfavore seleziona almeno un immagine!")
    }
  }
   
        console.log(formData);
    return (
        <Form onSubmit={handleSubmit} encType='multipart/form-data'>
            <Form.Group className="mb-3" controlId="formGroupName">
                <Form.Label>NAME</Form.Label>
                <Form.Control type="input"  placeholder="Name" onChange={(e)=>setFormData({
                    ...formData,
                    name:e.target.value
                })}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupName">
                <Form.Label>SURNAME</Form.Label>
                <Form.Control type="input"  placeholder="Name" onChange={(e)=>setFormData({
                    ...formData,
                    surname:e.target.value
                })}/>
            
            
                
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>EMAIL ADDRESS</Form.Label>
                <Form.Control type="email"  placeholder="Enter email" onChange={(e)=>setFormData({
                    ...formData,
                    email:e.target.value
                })} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupBirthDate">
                <Form.Label>BIRTH DATE</Form.Label>
                <Form.Control type="date"  placeholder="Enter your birthdate" onChange={(e)=>setFormData({
                    ...formData,
                    dob:e.target.value
                })} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>PASSWORD</Form.Label>
                <Form.Control type="password"  placeholder="Password" onChange={(e)=>setFormData({
                    ...formData,
                    password:e.target.value
                })} />
                <Form.Label>AVATAR</Form.Label>
                <Form.Control type="file" onChange={onChangeHandleFile} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default FormAuthor;
