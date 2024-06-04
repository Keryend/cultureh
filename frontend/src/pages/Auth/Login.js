import React, { useState } from 'react';
import Layout from "../../components/Layout/Layout";
import {useNavigate} from 'react-router-dom'
import { 
    MDBBtn, 
    MDBContainer, 
    MDBRow, 
    MDBCol, 
    MDBCard, 
    MDBCardBody, 
    MDBCardImage, 
    MDBInput, 
    MDBIcon, 
  } 
  from 'mdb-react-ui-kit';
  import axios from 'axios'

const Login = () => {

    const  [email, setEmail] = useState('')
    const  [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:8080/api/v1/auth/login', { email, password})
            if(res.data.success){
                alert(res.data.message)
                navigate('/');
            }else{
                alert(res.data.message)
            }
        } catch (error) {
            console.log(error)
            alert('login failed. Please try again.');
        }
    }
  return (
    <Layout title={"Login here"}>
      <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='8' lg='5' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign in</p>
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size='lg' />
                  <MDBInput
                    placeholder="Your email"
                    id='form2'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg' />
                  <MDBInput
                    placeholder='Password'
                    id='form3'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <MDBBtn className='mb-4' size='lg' type='submit'>Login</MDBBtn>
              </form>
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg' fluid />
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

      <link
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
        rel="stylesheet"
      />

    </MDBContainer>
    </Layout>
  );
};

export default Login;
