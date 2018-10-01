import React from 'react';
import { TextInput, Breadcrumb, BreadcrumbItem, Button, Link } from 'carbon-components-react'
import './loginComponent.css';
import RegisterComponent from '../Register/RegisterComponent';
class LoginDetails extends React.Component {
  render() {
    return (
      <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
        <div style={{ marginTop: '20%' }}>
          <center><p className='bx--label'>Login, If you are Registered User</p></center>
          <br />
          <div className='row'>
            <div className='col-md-12 col-xs-12'>
              <TextInput labelText='Name' placeholder='Enter Username' />
            </div>
          </div>
          <br />
          <div className='row'>
            <div className='col-md-12 col-xs-12'>
              <TextInput labelText='Password' placeholder='Enter Password' />
            </div>
          </div>
          <br />
          <div className='row'>
            <div className='col-md-12 col-xs-12'>
              <Link href="#">Forgot Password?</Link>
            </div>
          </div>
          <br />
          <div className='row'>
            <div className='col-md-12 col-xs-12'>
              <center><Button>Login</Button></center>
            </div>
          </div>
          <br />
        </div>

      </div>
    )
  }
}
class AlternateLogin extends React.Component {

  render() {
    return (
      <div style={{ height: '100%', position: 'relative' }}>
        <div style={{ marginTop: '50%' }}>
          <p style={{ padding: '.5rem' }} className='bx--label'>Alternate Login Through</p><br />
          <Button style={{ backgroundColor: '#4267b2', textAlign: 'left', borderRadius: '12px', verticalAlign: 'baseline' }}>
            <div className='row'>
              <div className='col' style={{ marginTop: '6px' }} >
                Continue With
              </div>
              <div className='circle'>
                <div style={{ marginTop: '6px' }}>f</div>
              </div>
            </div>
          </Button>
          <br />
          <br />
          <a href='http://localhost:8080/loginMe'><Button className='bx--btn--danger' style={{ textAlign: 'left', borderRadius: '12px', backgroundColor: '#e0182d', color: '#fff' }} onClick={(evt) => <Link to="/loginMe" >Click to login</Link>}>
            <div className='row'>
              <div className='col' style={{ marginTop: '6px' }} >
                Continue With
                      </div>
              <div className='circleRed'>
                <div style={{ marginTop: '6px' }}>G</div>
              </div>
            </div>
          </Button></a>
        </div>
      </div>
    )
  }
}
class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'displayScreen': 'login'
    }
  }
  render() {
    return (
      <div className='row' style={{ height: '100%' }} >
        <div className='splitScreen1' >
          <img src={require('../../resources/images/chit1.jpg')} style={{ height: '100%', width: '100%' }} />
        </div>
        <div className='splitScreen2'>
          <div className='row' style={{ marginLeft: 0, marginRight: 0 }}>
            <div className='col'>
              <Breadcrumb noTrailingSlash={true} style={{ height: '5rem' }} >
                <BreadcrumbItem className='fontWeightForBreadCrumb'>
                  <span style={{ fontSize: '1rem', fontWeight: '600' }} onClick={(evt) => { this.setState({ displayScreen: 'register' }) }}>Sign Up</span>
                </BreadcrumbItem>
                <BreadcrumbItem href="#" className='fontWeightForBreadCrumb'>
                  <span style={{ fontSize: '1rem', fontWeight: '600', verticalAlign: 'baseline' }} onClick={(evt) => { this.setState({ displayScreen: 'login' }) }}>Login</span>
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
          <div className='row' style={{ marginLeft: 0, marginRight: 0 }} >
            {this.state.displayScreen === 'register' ?
              <div className='col-md-7 col-xs-7' style={{ marginLeft: 'inherit' }}>
                <RegisterComponent />
              </div> :
              <div className='col-md-7 col-xs-7' style={{ marginLeft: 'inherit' }}>
                <LoginDetails />
              </div>}
            <div className='col-md-1 col-xs-1'>
              <div className="inner"></div>
            </div>
            <div className='col-md-4 col-xs-4' style={{ marginLeft: 'inherit' }}>
              <AlternateLogin />
            </div>

          </div>
        </div>

      </div >
    )
  }
}
export default LoginComponent