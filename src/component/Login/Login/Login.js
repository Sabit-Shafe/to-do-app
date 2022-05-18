import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';

import SocialLogin from '../SocialLogin/SocialLogin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Load from '../../Shared/Load/Load';

const Login = () => {
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const emailRef = useRef('');
    const passRef = useRef('');
    const navigate = useNavigate('')
    const location = useLocation();

    let from = location.state?.from?.pathname || "/";
    if (user) {
        navigate(from, { replace: true });
    };
    

    const handleSubmit =async event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passRef.current.value;
        await signInWithEmailAndPassword(email, password);
        const {data} = await fetch(`https://protected-tor-63915.herokuapp.com/login`)
        localStorage.setItem('accessToken', data.accessToken);
        navigate(from, { replace: true });

    }
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(
        auth
    );
    if(loading || sending) {
        return <Load></Load>
    }
    const resetPassword = async () => {
        const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast('Sent email');
        }
        else{
            toast('please enter your email address!!');
        }
        }
    

    const navigateRegister = event => {
        navigate('/signup');
    }
    // if(user){
    //     navigate('/home')
    // }
    let errorElement;



    if (error) {
        errorElement = <p className='text-danger'>Error: {error?.message} </p>
    }


    return (
        <div style={{backgroundColor: 'azure'}} >
        <div className="container mx-auto w-50" style={{backgroundColor: 'aliceblue'}}>
            <h1 className="text-success">Please Login</h1>
            <Form onSubmit={handleSubmit}>
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
                <Button className="w-50 mx-auto d-block mb-5" variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            {errorElement}
            <p>Forget Password? <button className='btn btn-link text-primary pe-auto text-decoration-none' onClick={resetPassword}>Reset Password</button> </p>
            <p>New to this site? <Link to="/signup" className='text-primary pe-auto text-decoration-none' onClick={navigateRegister}>Please Register</Link> </p>
            <SocialLogin></SocialLogin>
            <ToastContainer></ToastContainer>
        </div>
        </div>
    );
};

export default Login;