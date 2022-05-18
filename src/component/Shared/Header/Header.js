import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';




const Header = () => {
    const [user] = useAuthState(auth);

    const handleSignOut = () => {
        signOut(auth);
    }

    return (
        <>
            <Navbar collapseOnSelect sticky="top" opacity="25" style={{ color: 'black' }} bg="dark" expand="lg" variant="info">
                <Container fluid>
                    <Navbar.Brand className="text-info fs-2 fw-bold" href="#home">T0 Do APP</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll"  className="bg-info"/>
                    <Navbar.Collapse id="navbarScroll">
                    
                        <Nav className="justify-content-end ms-auto ">
        
                           

                        </Nav>
                        <Nav className="text-info">
                            {
                                user && <>
                                   
                                    <Nav.Link as={Link} to="todo">Task</Nav.Link>
                                </>
                            }

                            {
                                user ?
                                    <button className='btn btn-link text-white bg-info text-decoration-none' onClick={handleSignOut}>sign out</button>
                                    :
                                    <Nav.Link as={Link} to="login">
                                        Login
                                    </Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;