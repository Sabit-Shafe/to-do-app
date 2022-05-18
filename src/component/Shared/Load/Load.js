import React from 'react';
import { Spinner } from 'react-bootstrap';

const Load = () => {
    return (
        <div>
            <div style={{ height: '300px' }} className='w-100 d-flex justify-content-center align-items-center'>
                <Spinner animation="border" variant="warning" />
            </div>
        </div>
    );
};

export default Load;