import React from 'react'
import { useNavigate} from 'react-router-dom';
import {
  MDBFooter,
  MDBContainer,
  MDBBtn
} from 'mdb-react-ui-kit';

const Footer = () => {
  const navigate = useNavigate()
  const handleSignUpClick = () => {
    navigate('/register');
  };
  return (
    <MDBFooter className='text-center text-white' style={{ backgroundColor: '#21081a' }}>
      <MDBContainer className='p-4 pb-0'>
        <section className=''>
          <p className='d-flex justify-content-center align-items-center'>
            <span className='me-3'>Register for free</span>
            <MDBBtn type='button' outline color="light" onClick={handleSignUpClick} rounded>
              Sign up!
            </MDBBtn>
          </p>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2020 Copyright:
        <a className='text-white' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </a>
      </div>
    </MDBFooter>
  )
}

export default Footer