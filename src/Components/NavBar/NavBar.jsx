import React, { useContext, useState } from 'react'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Image } from 'react-bootstrap'
import '../NavBar/NavBar.css'
import LoginModal from '../LoginModal'
import { FormDataContext } from '../../Context/FormDataContex'


const NavBar = ({ HomePage }) => {
    // apertura e chiusura Modale
    const [modalVisible, setModalVisible] = useState(false)
    const { formData } = useContext(FormDataContext) //context passata in index per prendere i dati dei login

    

    const showModal = () => {
        if(getUserToken()=== null){ setModalVisible(true)}
        else{
            localStorage.removeItem('userLoggedIn')
        }
       
    }
    
 
    
// fetch per login
    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/login`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 
                  "Content-Type": "application/json"
                }
                
            })
            
            const data =  await response.json()
           
            localStorage.setItem('userLoggedIn',JSON.stringify(data.token) )

            
        

            return data
            
            
           
        } catch (error) {
            console.error('Errore nella richiesta', error)
        }
    }
    
    const getUserToken = () => {
        console.log(localStorage.getItem('userLoggedIn'));
       return localStorage.getItem('userLoggedIn')
        
    }
    return (
        <>
            <Navbar expand="lg" className="navbar ">
                <Container fluid>
                    <Image
                        className="logo ms-4"
                        src="https://img.favpng.com/19/16/16/computer-icons-blogger-logo-png-favpng-B7KarAb7aWnaBXeV9dtiJcVjb.jpg"
                        alt="Logo"
                    />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link className="blog" href="#action1">
                                Blog Andrea
                            </Nav.Link>
                        </Nav>
                        <Form className="d-flex" >
                            <Form.Control
                                type="search"
                                placeholder="Inserisci qui "
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button className="bottone">Cerca</Button>

                            <Button className="login ms-2 " onClick={showModal}>
                                
                                {getUserToken()=== null ? "login" : "logout"}
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {setModalVisible && (
                <LoginModal
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                    onSubmit={onSubmit}
                    showModal={showModal}
                   
                />
            )}
        </>
    )
}

export default NavBar
