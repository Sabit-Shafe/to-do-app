import React, { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init'
import SocialLogin from '../SocialLogin/SocialLogin';
import Load from '../../Shared/Load/Load';

const Signup = () => {
    const [agree, setAgree] = useState(false);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [updateProfile, updating] = useUpdateProfile(auth);
    


    

    const emailRef = useRef('');
    const passRef = useRef('');
    const nameRef = useRef('');

    const navigate = useNavigate();
    const navigateLogin = () => {
        navigate('/login');
    }

    if (user) {
        navigate('/home')
    }
    if (loading || updating) {
        return <Load></Load>
    }
    let errorElement;
    
    if (error){
        errorElement = <p className='text-danger'>Error: {error?.message}</p>
    }

    const handleSignup = async (event) => {
        event.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passRef.current.value;
        
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ name });
        navigate('/home')

    }

    return (
        <div className="container mx-auto w-50" style={{backgroundColor: 'aliceblue'}}>
            <h1 className="text-success">Please Signup</h1>
            <Form onSubmit={handleSignup}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control ref={nameRef} type="text" placeholder="Enter Name" required />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passRef} type="password" placeholder="Password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check onClick={() => setAgree(!agree)} className={`ps-3 ${agree ? '' : 'text-danger'}`} type="checkbox" label="Accept terms and conditions" />
                </Form.Group>
                <Button
                    disabled={!agree}
                    type="submit"
                    value="Signup"
                    className="w-50 mx-auto d-block mb-5" variant="primary">
                    Sign up
                </Button>
            </Form>
            {errorElement} 
            <p>Already have an account? Please <Link to="/login" className='text-primary pe-auto text-decoration-none' onClick={navigateLogin}>Please Login</Link> </p>
            <SocialLogin></SocialLogin>
        </div>
    );
};
export default Signup;