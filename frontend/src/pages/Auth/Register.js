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

const Register = () => {

    const  [name, setName] = useState('')
    const  [email, setEmail] = useState('')
    const  [password, setPassword] = useState('')
    const  [contact, setContact] = useState('')
    const  [city, setCity] = useState('')
    const  [sport, setSport] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:8080/api/v1/auth/register', {name, email, password, contact, city, sport})
            if(res.data.success){
                alert(res.data.message)
                navigate('/login');
            }else{
                alert(res.data.message)
            }
        } catch (error) {
            console.log(error)
            alert('Form submission failed. Please try again.');
        }
    }
  return (
    <Layout title={"Register here"}>
      <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='8' lg='5' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="user me-3" size='lg' />
                  <MDBInput
                    placeholder='Your Name'
                    id='form1'
                    type='text'
                    className='w-100'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

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

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="phone-alt me-3" size='lg' />
                  <MDBInput
                    placeholder='Your Phone number'
                    id="typePhone"
                    type="tel"
                    className='w-100'
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="city me-3" size='lg' />
                  <MDBInput
                    placeholder='Your city'
                    id='formCity'
                    type='text'
                    className='w-100'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="futbol me-3" size='lg' />
                  <MDBInput
                    placeholder='Your sport'
                    id='formSport'
                    type='text'
                    className='w-100'
                    value={sport}
                    onChange={(e) => setSport(e.target.value)}
                  />
                </div>

                <MDBBtn className='mb-4' size='lg' type='submit'>Register</MDBBtn>
              </form>
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
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

export default Register;
