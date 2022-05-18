import React from 'react';
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Load from '../../Shared/Load/Load';

const SocialLogin = () => {

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithGithub, userGit, loadingGit, errorGit] = useSignInWithGithub(auth);
    const location = useLocation();
    const navigate = useNavigate();




    if (loading || loadingGit) {
        return <Load></Load>
    }


    let errorElement;

    let from = location.state?.from?.pathname || "/";

    if (error || errorGit) {
        errorElement = <p className='text-danger'>Error: {error?.message} {errorGit?.message}</p>
    }

    if (user || userGit) {
        navigate(from, { replace: true });
    }

    return (
        <div>
            <div className='d-flex align-items-center'>
                <div style={{ height: '3px' }} className='bg-info w-75'></div>
                <p className='mt-2 px-2 text-primary'>or</p>
                <div style={{ height: '3px' }} className='bg-info w-75'></div>
            </div>
            {errorElement}
            <div className=''>
                <button
                    onClick={() => signInWithGoogle()}
                    className='btn btn-success w-75 d-block mx-auto my-2'>
                    <span className='px-2'>Google Sign In</span>
                </button>
                <button
                    onClick={() => signInWithGithub()}
                    className='btn btn-success w-75 d-block mx-auto'>
                    <span className='px-2'>Github Sign In</span>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;